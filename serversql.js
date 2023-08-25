const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require ('body-parser')                                                                                               
const https = require("https");                                                                                               
const app = express();                                                                                               
app.use(cors());                                                                                               
app.use(express.json());                                                                                               
app.use( bodyParser.json({limit: '50mb'}) );                                                                                               
app.use(bodyParser.urlencoded({                                                                                               
  limit: '50mb',                                                                                               
  extended: true,                                                                                               
  parameterLimit:50000                                                                                               
}));                                                                                               
const db = mysql.createConnection({                                                                                               
  host: "localhost",                                                                                               
  user: "root",                                                                                               
  password: "Passw0rd123",                                                                                               
  database: "testandroid",                                                                                               
});                                                                                               
                                                                                               
app.get("/", (req, res) => {                                                                                               
  res.json("hello");                                                                                               
});                                                                                               
                                                                                               
  app.post("/api/endpoint", (req, res) => {                                                                                               
    const data =req.body;                                                                                               
                                                                                                   
    const q = "INSERT INTO `testandroid`.`t1` (`name`, `age`) VALUES (?,?)";                                                                                               
                                                                                               
                                                                                                 
    const values = data.map((item) => [item.title, item.description]);                                                                                               
                                                                                                 
    db.query(q, [values], (err, data) => {                                                                                               
      if (err) return res.send(err);                                                                                               
      return res.json(data);                                                                                               
    });                                                                                               
  });                                                                                               
                                                                                               
app.get("/api/endpoint", (req, res) => {                                                                                               
  const q = "SELECT * FROM t1";                                                                                               
  db.query(q, (err, data) => {                                                                                               
    if (err) {                                                                                               
      console.log(err);                                                                                               
      return res.json(err);                                                                                               
    }                                                                                               
    return res.json(data);                                                                                               
  });                                                                                               
});                                                                                               
app.post('/api/endpoint', (req, res) => {                                                                                               
  const { title, description } = req.body;                                                                                               
                                                                                               
  // Store the data                                                                                               
  data.push({ title, description });                                                                                               
                                                                                               
  // Send a response                                                                                               
  res.json({ message: 'Data inserted successfully' });                                                                                               
});                                                                                               
                                                                                               
                                                                                               
/*var config = {                                                                                               
  user: 'SEBN\\Administrator',                                                                                               
  password: 'Passw0rd123',                                                                                               
  server: 'JENWPC0888\\MSSQLSERVER01',                                                                                                
  database: 'SAPSTOCK',                                                                                               
  synchronize: true,                                                                                               
  trustServerCertificate: true,                                                                                               
};                                                                                               
app.get('/data', async (req, res) => {                                                                                               
  try {                                                                                               
    await sql.connect(config);                                                                                               
    const result = await sql.query('SELECT * FROM [SAPSTOCK].[dbo].[LX03]');                                                                                               
    res.json(result.recordset);                                                                                               
  } catch (error) {                                                                                               
    console.error('Error retrieving data:', error);                                                                                               
    res.status(500).json({ error: 'An error occurred' });                                                                                               
  } finally {                                                                                               
    sql.close();                                                                                               
  }                                                                                               
});                                                                                               
*/                                                                                               
// Define a sample data array                                                                                               
const data = [                                                                                               
  { id: 1, name: 'John Doe' },                                                                                               
  { id: 2, name: 'Jane Smith' },                                                                                               
  { id: 3, name: 'Alice Johnson' }                                                                                               
];                                                                                               
                                                                                               
// Define the API endpoint to retrieve the data                                                                                               
app.get('/api/endpoint5454', (req, res) => {                                                                                               
  res.json(data);                                                                                               
});                                                                                               
                                                                                               
/****************************************************** */                                                                                               
                                                                                               
                                                                                               
app.use(bodyParser.json());                                                                                               
                                                                                               
const connection = mysql.createConnection({                                                                                               
  host: 'your_mysql_host',                                                                                               
  user: 'your_mysql_user',                                                                                               
  password: 'your_mysql_password',                                                                                               
  database: 'your_database_name',                                                                                               
});                                                                                               
                                                                                               
db.connect((err) => {                                                                                               
  if (err) {                                                                                               
    console.error('Error connecting to database:', err);                                                                                               
  } else {                                                                                               
    console.log('Connected to the database');                                                                                               
  }                                                                                               
});                                                                                               
                                                                                               
app.post('/create1', (req, res) => {                                                                                               
  const { name, email, date } = req.body;                                                                                               
                                                                                               
  const query = `INSERT INTO users (Product, Quantity, date) VALUES (?, ?, ?)`;                                                                                               
  db.query(query, [name, email, date], (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error creating user:', error);                                                                                               
      res.status(500).json({ message: 'Failed to create user' });                                                                                               
    } else {                                                                                               
      res.json({ message: 'User created successfully' });                                                                                               
    }                                                                                               
  });                                                                                               
});                                                                                               
       // Server code
       app.post('/create', (req, res) => {
        const { name, email, date } = req.body;
      
        const insertQuery = `INSERT INTO users (Product, Quantity, date) VALUES (?, ?, ?)`;
        db.query(insertQuery, [name, email, date], (error, results) => {
          if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
              // Duplicate entry error, product already exists
              res.status(400).json({ message: 'Product already exists' });
            } else {
              console.error('Error creating user:', error);
              res.status(500).json({ message: 'Failed to create user' });
            }
          } else {
            res.status(200).json({ message: 'User created successfully' });
          }
        });
      });
                                                                                        
app.get('/read', (req, res) => {                                                                                               
  const query = `SELECT * FROM users`;                                                                                               
  db.query(query, (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error reading users:', error);                                                                                               
      res.status(500).json({ message: 'Failed to read users' });                                                                                               
    } else {                                                                                               
      res.json(results);                                                                                               
    }                                                                                               
  });                                                                                               
});        
app.get('/getuser/:user/:pass', (req, res) => {  
  const user = req.params.user;
  const password = req.params.pass;                                                                                             
  const query = `SELECT * FROM login where username = ? and password =?`;                                                                                               
  db.query(query,[user,password], (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error reading users:', error);                                                                                               
      res.status(500).json({ message: 'Failed to read users' });                                                                                               
    } else {                                                                                               
      res.json(results);                                                                                               
    }                                                                                               
  });                                                                                               
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

    if (results.length > 0) {
      // User found
      res.json({ success: true, message: 'Login successful' });
    } else {
      // User not found
      res.json({ success: false, message: 'Login failed' });
    }
  });
});
app.get('/readT3', (req, res) => {                                                                                               
  const query = `SELECT * FROM compadata`;                                                                                               
  db.query(query, (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error reading users:', error);                                                                                               
      res.status(500).json({ message: 'Failed to read users' });                                                                                               
    } else {                                                                                               
      res.json(results);                                                                                               
    }                                                                                               
  });                                                                                               
});  

app.get('/t3', (req, res) => {    
  const query1=`DELETE FROM compadata`
  db.query(query1)                                                                        
 // const query = `SELECT * FROM users`;        
 const query =`INSERT INTO compadata (PrNum, quantity1, quantity2)
SELECT p.Art, p.Qnt ,p1.Quantity  FROM sapdata p
INNER JOIN users p1 ON p.Art = p1.Product`
                                                                                         
  db.query(query, (error, results) => { 
                                                                                               
    if (error) {                                                                                               
      console.error('Error adding data:', error);                                                                                               
      res.status(500).json({ message: 'Failed to load data' });                                                                                               
    } else {                                                                                               
      res.json(results);                                                                                               
    }                                                                                               
  });                                                                                               
});              
// DELETE route to delete data by ID
app.delete('/delete/:id', (req, res) => {
  const itemId = req.params.id;

  // Execute a DELETE SQL query to delete the data from your database
  const sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error('Error deleting data: ' + err.stack);
      return res.status(500).json({ error: 'Error deleting data' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json({ message: 'Data deleted successfully' });
  });
});

// ... (previous code)

// PUT or PATCH route to update data by ID
app.put('/update/:id', (req, res) => {
  const itemId = req.params.id;
  const { newQuantity } = req.body;

  // Execute a SQL query to update the data in your database
  const sql = 'UPDATE users SET Quantity = ? WHERE id = ?';

  db.query(sql, [newQuantity, itemId], (err, result) => {
    if (err) {
      console.error('Error updating data: ' + err.stack);
      return res.status(500).json({ error: 'Error updating data' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.json({ message: 'Data updated successfully' });
  });
});

// ... (remaining code)

app.get('/readSap', (req, res) => {                                                                                               
  const query = `SELECT * FROM SAPDATA`;                                                                                               
  db.query(query, (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error reading users:', error);                                                                                               
      res.status(500).json({ message: 'Failed to read users' });                                                                                               
    } else {                                                                                               
      res.json(results);                                                                                               
    }                                                                                               
  });                                                                                               
});                                                                                               
                                                                                               
app.put('/update545120/:id', (req, res) => {                                                                                               
  const { name, email, age } = req.body;                                                                                               
  const userId = req.params.id;                                                                                               
                                                                                               
  const query = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;                                                                                               
  db.query(query, [name, email, age, userId], (error, results) => {                                                                                               
    if (error) {                                                                                               
      console.error('Error updating user:', error);                                                                                               
      res.status(500).json({ message: 'Failed to update user' });                                                                                               
    } else {                                                                                               
      res.json({ message: 'User updated successfully' });                                                                                               
    }                                                                                               
  });                                                                                               
});                                                                                               
                                                                                               
app.delete('/deleteT3', (req, res) => {                                                                                               
  const query1=`DELETE FROM compadata`                                                                                            
  db.query(query1)                                                                                      
});                                                                                               
/*********************************************************** */          
app.post('/t30203', (req, res) => {
 

  const query1 = `
    INSERT INTO compadata (PrNum, quantity1, quantity2)
    SELECT Art as PrNum, Qnt AS quantity1 ,name ,email as quentity2 FROM sapdata ,users
    WHERE Art = name
  `;
const query =`INSERT INTO compadata (PrNum, quantity1, quantity2)
SELECT p.Art, p.Qnt ,p1.Quantity  FROM sapdata p
INNER JOIN users p1 ON p.Art = p1.name`
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error combining quantities' });
    } else {
      res.status(200).json({ message: 'Quantities combined successfully' });
    }
    console.log(result)
  });
});







// Start the server                                                                                               
                                                                                               
app.listen(5005,() => {                                                                                               
  console.log('Server running on port 5005');                                                                                               
});                                                                                               
                                                                                                