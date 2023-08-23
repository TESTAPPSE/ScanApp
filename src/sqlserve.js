const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3002; // Specify your desired port

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-database-name',
});

// API endpoint to handle the data insertion
app.post('/insertData', (req, res) => {
  const data = req.body; // Assuming the parsed data is sent in the request body

  // Perform the database insertion
  const query = 'INSERT INTO LX03 (typ, material) VALUES ?';
  const values = data.map((item) => [item.column1, item.column3]);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Internal server error');
      return;
    }

    connection.query(query, [values], (err, results) => {
      connection.release();

      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Internal server error'); 
        return;
      }

      res.status(200).send('Data inserted successfully');
    });
  });
});

// Start the server
app.listen(5002, () => {
  console.log(`Server is listening on port ${port}`);
});
