import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// CSS for the inline navbar
const navbarStyle = {
   backgroundColor: '#1f4d7e', // Blue background color
  padding: '10px 10px', // Adjust padding as needed
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed', // Make the navbar fixed
  top: '0', // Set the top position to 0 to fix it at the top
  width: '98%', // Make the navbar full width
  zIndex: '1000',
  borderRadius: '15px 15px 15px 15px'
  
};

const navbarTextStyle = {
  color: '#fff', // White text color
  fontSize: '26px', // Adjust font size as needed
  fontWeight: 'bold',
};                                              

function TableData() {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [scannedData, setScannedData] = useState('');
  const [manualVerificationData, setManualVerificationData] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [exportData, setExportData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTableData(tableName);
  }, [tableName]);

  useEffect(() => {
    if (scannedData && selectedColumn) {
      verifyData(scannedData);
      setScannedData('');
    }
  }, [scannedData, selectedColumn, tableData]);

  // useEffect(() => {
  //   if (manualVerificationData && selectedColumn) {
  //     verifyData(manualVerificationData);
  //   }
  // }, [manualVerificationData, selectedColumn, tableData]);

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

  const verifyData = (dataToVerify) => {
    const matchingRow = tableData.find((row) => {
      if (selectedColumn === 'id') {
        return row[selectedColumn] === dataToVerify;
      } else if (row[selectedColumn] && row[selectedColumn]===(dataToVerify)) {
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
        newTableName = oldTableName.replace('_unfinished', '_verified');
      } else if (oldTableName.includes('_verified') && !allVerified) {
        newTableName = oldTableName.replace('_verified', '_unfinished');
      } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
        newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
      } else {
        newTableName = oldTableName;
      }

      await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
        method: 'POST',
      });

      await Promise.all(
        tableData
          .filter((row) => row.Status === 'Verified')
          .map(async (row) => {
            await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Status: 'Verified' }),
            });
          })
      );

    } catch (error) {
      console.error(error);
    }
    navigate('/PA1');
  };

  return (
    <div>
      <div style={navbarStyle}>
        <div style={navbarTextStyle}>SEBN,TN</div>
        <div style={navbarTextStyle}><span style={{fontSize:"18px",cursor:"pointer"}} onClick={()=>navigate("/")}>LogOut</span></div>
        </div>
      <div className="table-container" style={{marginTop:"70px"}}>
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
                <td>
                  <TextField
                    fullWidth
                    label="Manual Verification Data"
                    variant="outlined"
                    value={manualVerificationData}
                    onChange={(e) => setManualVerificationData(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        verifyData(manualVerificationData);
                        setManualVerificationData('');
                      }
                    }}
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
