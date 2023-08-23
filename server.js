const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 5001;

app.get('/run-script', (req, res) => {
  exec('C:/Users/Ghaith.bentouati/Desktop/ScriptLx03.vbs', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error executing script');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Script executed successfully');
  });
});

/*const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3002; // Specify your desired port

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'JENWPC0888',
  user: 'JENWPC0888\Administrator',
  password: '',
  database: 'SAPSTOCK',
});
app.get('/api/data', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error('Error connecting to SQL Server:', err);
      res.status(500).send('Internal server error');
      console.log("connected I guess")

      return;
    }
   
    const query = 'SELECT * FROM LX03';

    new sql.Request().query(query, (err, result) => {
      sql.close();

      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal server error');
        return;
      }

      res.status(200).json(result.recordset);
    });
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});*//*
const express = require('express');
const mysql = require('mysql')
const db = mysql.createConnection({
host: "JENWPC0888",
user: "JENWPC0888\Administrator",
password: "Passw0rd123",
database:"SAPSTOCK" 
})

module.exports = db;
const app = express();
const port = 3002; // Specify your desired port
app.get("/get", (req,res)=>{
  db.query("SELECT * LX03 ", (err,result)=>{ 
      if(err) {
      console.log(err)
      } 
  res.send(result)
  console.log("succes")
  });   });

*/
// API endpoint to fetch data from SQL Server
/*app.get('/api/data', (req, res) => {
  sql.connect(config)
    .then((pool) => {
      const query = 'SELECT * FROM LX03';

      return pool.request().query(query);
    })
    .then((result) => {
      sql.close();

      res.status(200).json(result.recordset);
    })
    .catch((err) => {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal server error');
    });
});*/
/*const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3002; // Specify your desired port

// Database connection configuration
const config = {
  host: 'JENWPC0888',
  database: 'SAPSTOCK',
  user: 'JENWPC0888\Administrator',
  password: 'Passw0rd123',
  
};

// API endpoint to fetch data from SQL Server
app.get('/api/data', (req, res) => {
  sql.connect(config)
    .then((pool) => {
      const query = 'SELECT * FROM LX03';

      return pool.request().query(query);
    })
    .then((result) => {
      sql.close();

      res.status(200).json(result.recordset);
    })
    .catch((err) => {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal server error');
    });
});

*/
// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
