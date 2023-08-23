// DataTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css'; // Import the CSS file
import Navbar from './Navbar';
const DataTable = () => {
  const [data, setData] = useState([]);
  const ip = '10.110.15.107';

  useEffect(() => {
    // Replace with your backend API URL
    axios.get(`http://`+ip+`:5005/read`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
     
  }, []);

  return (
    <div>  <Navbar />
    <div className="table-container">
    
      <h2>Scanned Data</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Scanned Quantity</th>
            <th>Scan date</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        
          {data.map((item) => (
            <tr
              key={item.id}
              style={{
                background: item.quantity1 !== item.quantity2 ? '#ff0000' : 'transparent',
                color: item.quantity1 !== item.quantity2 ? '#000' : 'inherit',
                fontWeight:'bold',fontSize:'16px'
              }}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.date}</td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        
      </table>
    </div>
    </div>
  );
};

export default DataTable;
