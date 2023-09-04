import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
function TableData() {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [scannedData, setScannedData] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(''); // Added state for selected column
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    fetchTableData(tableName);
  }, [tableName]);

  useEffect(() => {
    if (scannedData && selectedColumn) {
      const matchingRow = tableData.find((row) => {
        if (row[selectedColumn] && row[selectedColumn].includes(scannedData)) {
          return true;
        }
        return false;
      });

      if (matchingRow) {
        const updatedTableData = tableData.map((row) =>
          row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
        );
        setTableData(updatedTableData);
      }

      setScannedData('');
    }
  }, [scannedData, selectedColumn, tableData]);

  const fetchTableData = (tableName) => {
    fetch(`http://10.110.21.216:5000/data/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        // Initialize selectedColumn with the first column name
        if (data.length > 0) {
          setSelectedColumn(Object.keys(data[0])[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const exportToExcel = (type) => {
    const filteredData = tableData.filter((row) => {
      if (type === 'verified') {
        return row.Status === 'Verified';
      } else if (type === 'notVerified') {
        return row.Status !== 'Verified';
      }
      return true; // Export both
    });
    const currentDate = new Date(); // Get the current date and time
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
      (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
      currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
      currentDate.getMinutes().toString().padStart(2, '0')}`;
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  const saveAndExit = () => {
    // Code for saving changes and exiting
  };

  return (
    <div>
      <div className="table-container">
        <h2>File Data: {tableName}</h2>
        
        <table className='table'>
          <thead>
          <tr><td>        <div>
          <FormControl fullWidth variant="outlined">
          <InputLabel>Select Column</InputLabel>
          <Select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            label="Select Column"
          >
            {tableData.length > 0 &&
              Object.keys(tableData[0]).map((key, index) => (
                <MenuItem key={index} value={key}>
                  {key}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        </div>
        </td>
<td>
<TextField // Replace the <input> with Material-UI TextField
          fullWidth
          label="Scan Product Name or Number"
          variant="outlined"
          value={scannedData}
          onChange={(e) => setScannedData(e.target.value)}
        />
        </td>
        </tr>
        
        </thead>
        
        </table>
        <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
        <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
        <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
        <Button onClick={saveAndExit}>Save and Exit</Button>
        <table className="table">
          <thead>
            <tr>
              {tableData.length > 0 &&
                Object.keys(tableData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
            </tr>
          </thead>
          
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
                }}
              >
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
        </table>
       
      </div>
    </div>
  );
}

export default TableData;
