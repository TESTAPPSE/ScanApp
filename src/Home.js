import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css'; // Import the CSS file
import Navbar from './Navbar';
import * as XLSX from 'xlsx'; // Import the xlsx library
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [productNameSearch, setProductNameSearch] = useState('');
  const [scannedQuantitySearch, setScannedQuantitySearch] = useState('');
  const [sapQuantitySearch, setSapQuantitySearch] = useState('');
  const ip = '10.110.21.216';

  useEffect(() => {
    // Replace with your backend API URL
    axios.get(`http://` + ip + `:5005/readT3`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, []);

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a new array with only the desired columns
    const filteredData = data.map((item) => ({
      Product: item.PrNum,
      Quantity1: item.quantity1,
      Quantity2: item.quantity2,
      Date: item.date,
    }));

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MismatchedData");
    XLSX.writeFile(wb, "MismatchedData.xlsx");
  };

  // Function to filter data based on search inputs
  const filteredData = data.filter((item) => {
    const productNameMatch =
      productNameSearch === '' || item.PrNum.toLowerCase().includes(productNameSearch.toLowerCase());
    const scannedQuantityMatch =
      scannedQuantitySearch === '' || item.quantity1 === scannedQuantitySearch;
    const sapQuantityMatch =
      sapQuantitySearch === '' || item.quantity2 === sapQuantitySearch;
  
    return productNameMatch && scannedQuantityMatch && sapQuantityMatch;
  });

  return (
    <div>
      <Navbar />
      <div className="table-container">
        <h2>Mismatched Data</h2>
        <div>
          <TextField
            type="text"
            placeholder="Search by Product Name"
            value={productNameSearch}
            onChange={(e) => setProductNameSearch(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Search by Scanned Quantity"
            value={scannedQuantitySearch}
            onChange={(e) => setScannedQuantitySearch(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Search by SAP Quantity"
            value={sapQuantitySearch}
            onChange={(e) => setSapQuantitySearch(e.target.value)}
          />
        </div>
        {/* Add an export button */}
        <Button onClick={exportToExcel}>Export to Excel</Button>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Scanned Quantity</th>
              <th>SAP Quantity</th>
              <th>Date</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          {filteredData.map((item) => (
            <tr
              key={item.id}
              style={{
                background: item.quantity1 !== item.quantity2 ? '#ff0000' : 'transparent',
                color: item.quantity1 !== item.quantity2 ? '#000' : 'inherit',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              <td>{item.PrNum}</td>
              <td>{item.quantity1}</td>
              <td>{item.quantity2}</td>
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