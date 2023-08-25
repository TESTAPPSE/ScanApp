// DataPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import { Nav } from 'react-bootstrap';
const DataPage = () => {
  const [data, setData] = useState([]);
  const [name, setInput1] = useState('');
  const [email, setInput2] = useState('');
 const ip = '10.110.21.216';
  const handleAddData = async () => {
    try {
      const currentDate = new Date(); // Get the current date and time
      const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
        (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
        currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
        currentDate.getMinutes().toString().padStart(2, '0')}`;


      // Send a POST request to your server to insert data into the database
      await axios.post(`http://`+ip+`:5005/create`, {
        name,
        email,
        date: formattedDate, // Include the date and time
      });

      // Clear input fields
      setInput1('');
      setInput2('');

      // Fetch and update the data from the server after insertion
      fetchData();
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const fetchData = async () => {
    try {
      // Send a GET request to your server to fetch data from the database
      const response = await axios.get(`http://`+ip+`:5005/read`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  return (
    <div><Navbar/>
    <div style={{marginTop:"20px"}}>
      <h2>Scan And Add New Data</h2>
      <div>
        <TextField
          type="text"
          placeholder="Product"
          value={name}
          onChange={(e) => setInput1(e.target.value)}
          style={{marginRight:"20px"}}
        />
        <TextField
          type="text"
          placeholder="Quantity"
          value={email}
          onChange={(e) => setInput2(e.target.value)}
        />
        <br></br>
        <Button onClick={handleAddData}>Add Data</Button>
      </div>
      <div className="table-container">
      <table className='table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Scanned Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{  '&:hover': {
                backgroundColor: '#f0f0f0', // Change the background color of the table row on hover
              },}}>
              <td>{item.Product}</td>
              <td>{item.Quantity}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default DataPage;
