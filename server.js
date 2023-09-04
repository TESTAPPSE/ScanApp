
const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');
const ExcelJS = require('exceljs');
const util = require('util');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(fileUpload());
app.use(express.static('uploads')); // Serve uploaded files
const bodyParser = require ('body-parser')                                                                                               
const https = require("https");                                                                                               
app.use(cors());                                                                                               
app.use(express.json());  
// MySQL Configuration (Replace with your own MySQL configuration)
const db = mysql.createConnection({
   host: "localhost",                                                                                               
   user: "root",                                                                                               
   password: "Passw0rd123",                                                                                               
   database: "contapp",
});

const query = util.promisify(db.query).bind(db);

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Array to store information about uploaded files
const uploadedFiles = [];

// Function to get the list of uploaded files
function getUploadedFiles() {
  return uploadedFiles.map((file) => ({
    filename: file.filename,
    uploadedAt: file.uploadedAt,
  }));
}
app.get('/tables', async (req, res) => {
  try {
    // Build the SQL query to fetch all table names
    const query = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = ?
    `;

    db.query(query, [db.config.database], (error, results) => {
      if (error) {
        console.error('Error fetching table names:', error);
        res.status(500).send('Internal Server Error.');
      } else {
        const tableNames = results.map((row) => row.TABLE_NAME); // Extract table names from the query results
        res.json(tableNames);
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error.');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM login WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database query error: ' + err.stack);
      res.status(500).json({ error: 'Database error' });
      return;
    }
//new
    if (results.length > 0) {
      // User found
      res.json({ success: true, message: 'Login successful' });
    } else {
      // User not found
      res.json({ success: false, message: 'Login failed' });
    }
  });
});

app.get('/data/:tableName', (req, res) => {
  const { tableName } = req.params;

  db.query(`SELECT * FROM ${tableName}`, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error.');
    } else {
      res.json(results);
    }
  });
});

app.delete('/delete/:tableName', (req, res) => {
  const { tableName } = req.params;

  db.query(`DROP TABLE ${tableName}`, (error) => {
    if (error) {
      console.error('Error deleting table:', error);
      res.status(500).send('Internal Server Error.');
    } else {
      res.json({ message: `Table '${tableName}' has been deleted.` });
    }
  });
});


app.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No files were uploaded.');
    }

    const excelFile = req.files.file;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(excelFile.data);

    // Assuming data is on the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Get column names from the first row of the Excel file
    const columnNames = [];
    worksheet.getRow(1).eachCell((cell) => {
      columnNames.push(cell.value);
    });

    // Check if the Excel file already contains a column named 'id'
    const hasIdColumn = columnNames.includes('id');

    // Adjust duplicate column names to make them unique
    const uniqueColumnNames = new Set();
    const adjustedColumnNames = [];
    for (const columnName of columnNames) {
      if (hasIdColumn && columnName === 'id') {
        // Skip the 'id' column if it already exists
        continue;
      }

      let adjustedColumnName = columnName;
      let count = 1;
      while (uniqueColumnNames.has(adjustedColumnName) || !adjustedColumnName) {
        adjustedColumnName = `${columnName}_${count}`;
        count++;
      }
      uniqueColumnNames.add(adjustedColumnName);
      adjustedColumnNames.push(adjustedColumnName);
    }

    const fileNameWithoutExtension = excelFile.name.replace(/\.[^/.]+$/, '');

    // Remove the (4) suffix if it exists
    const fileNameWithoutSuffix = fileNameWithoutExtension.replace(/\s*\(\d+\)$/, '');

    // Generate a table name based on the modified filename (without extension) and current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}_${currentDate.getHours()}_${currentDate.getMinutes()}`;
    const tableName = `${fileNameWithoutSuffix.replace(/\s/g, '_')}_${formattedDate}`;

    // Check if the table already exists in the database
    const tableExists = await query(`SHOW TABLES LIKE '${tableName}'`);
    if (tableExists.length === 0) {
      // Create the table schema based on adjusted column names
      const createTableQuery = `CREATE TABLE ${tableName} (
        ${adjustedColumnNames.map((name) => `\`${name}\` VARCHAR(255)`).join(', ')}
      )`;

      await query(createTableQuery); // Use the promisified query function
    }

    // Insert data into the database
    const rowCount = worksheet.rowCount;
    if (rowCount > 1) {
      const insertQuery = `INSERT INTO ${tableName} (${adjustedColumnNames.map((name) => `\`${name}\``).join(', ')}) VALUES ?`;

      const values = [];
      for (let i = 2; i <= rowCount; i++) {
        const rowValues = [];
        for (let j = 1; j <= adjustedColumnNames.length; j++) {
          const cell = worksheet.getCell(`${String.fromCharCode(64 + j)}${i}`);
          rowValues.push(cell ? cell.value : ''); // Use an empty string for empty cells
        }
        values.push(rowValues);
      }

      await query(insertQuery, [values]); // Use the promisified query function
    }

    // Store information about the uploaded file
    uploadedFiles.push({
      filename: excelFile.name,
      uploadedAt: new Date(),
    });

    res.send('File uploaded, table created, and data inserted into the database.');
  } catch (error) {
    console.error(error);

    let errorMessage = 'An error occurred during file processing.';
    if (error.message.includes('ER_DUP_ENTRY')) {
      errorMessage = 'Duplicate data detected. Check for duplicate entries in your file.';
    }

    res.status(500).send(errorMessage);
  }
});

app.get('/read', (req, res) => {
  const excludedTables = ['users', 'sapdata', 'login', 'compadata'];

  // Build the SQL query to fetch table names while excluding the specified ones
  const query = `
    SELECT table_name
    FROM testandroid.tables
    WHERE table_schema = ?
      AND table_name NOT IN (${excludedTables.map(name => '?').join(', ')})
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error reading users:', error);
      res.status(500).json({ message: 'Failed to read users' });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
