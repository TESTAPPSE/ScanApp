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
  const [quantitySearch, setQuantitySearch] = useState('');
  const ip = '10.110.21.216';

  useEffect(() => {
    // Replace with your backend API URL
    axios.get(`http://` + ip + `:5005/readSap`)
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
      Product: item.Art,
      Quantity: item.Qnt,
    }));

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SAPData");
    XLSX.writeFile(wb, "SAPData.xlsx");
  };

  // Function to filter data based on search inputs
  const filteredData = data.filter((item) => {
    const productName = item.Art.toLowerCase();
    const quantity = item.Qnt.toString();

    const productNameMatch =
      productNameSearch === '' || productName===(productNameSearch.toLowerCase());
    const quantityMatch = quantitySearch === '' || quantity===(quantitySearch);

    return productNameMatch && quantityMatch;
  });

  return (
    <div>
      <Navbar />
      <div className="table-container">
        <h2>SAP Data</h2>
        <div>
          <TextField
            type="text"
            placeholder="Search by Product Name"
            value={productNameSearch}
            onChange={(e) => setProductNameSearch(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Search by Quantity"
            value={quantitySearch}
            onChange={(e) => setQuantitySearch(e.target.value)}
          />
        </div>
        {/* Add an export button */}
        <Button onClick={exportToExcel}>Export to Excel</Button>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
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
              <td>{item.Art}</td>
              <td>{item.Qnt}</td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DataTable;
