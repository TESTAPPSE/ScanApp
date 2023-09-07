import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedColumn, setSelectedColumn] = useState('');
  const [exportData, setExportData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData(tableName);
    
  }, [tableName]);

  useEffect(() => {
    if (scannedData && selectedColumn) {
      const matchingRow = tableData.find((row) => {
        if (selectedColumn === 'id') {
          // Handle the "id" column differently
          return row[selectedColumn] === scannedData;
        } else if (row[selectedColumn] && row[selectedColumn]===(scannedData)) {
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
    const currentDate = new Date();
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

  const saveAndExit = async () => {
    try {
      // Check if all rows are verified
      const allVerified = tableData.every((row) => row.Status === 'Verified');

      // Prepare the new table name based on the old table name
      const oldTableName = tableName;
      let newTableName;

      // Check if the table name already contains "_unfinished" or "_verified"
      if (oldTableName.includes('_unfinished') && allVerified) {
        // If the table name ends with "_unfinished" and all rows are verified, remove "_unfinished"
        newTableName = oldTableName.replace('_unfinished', '_verified');
      } else if (oldTableName.includes('_verified') && !allVerified) {
        // If the table name ends with "_verified" and not all rows are verified, replace "_verified" with "_unfinished"
        newTableName = oldTableName.replace('_verified', '_unfinished');
      } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
        // If the table name doesn't contain "_unfinished" or "_verified" and not all rows are verified, append "_unfinished"
        newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
      } else {
        // In all other cases, keep the table name unchanged
        newTableName = oldTableName;
      }

      // Rename the table in the database
      await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
        method: 'POST',
      });

      // Update the "Status" of rows with "Verified" in the database
      await Promise.all(
        tableData
          .filter((row) => row.Status === 'Verified')
          .map(async (row) => {
            // Update the database with the new status (e.g., 'Completed')
            await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Status: 'Verified' }), // You may adjust the status value as needed
            });
          })
      );

     
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the renaming process or status update
    }
    navigate('/PA1');
  };

  return (
    <div>
      <div className="table-container">
        <h2>File Data: {tableName}</h2>
        <div className="table-scroll">
          <table className='table'>
            <thead>
              <tr>
                <td>
                  <div>
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
                  <TextField
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
          <div className="table-content">
          <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
        <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
        <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
        <Button onClick={() => saveAndExit()}>Save and Exit</Button>
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
       
      </div>
    </div>
  );
}

export default TableData;
