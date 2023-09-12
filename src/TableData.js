// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useParams } from 'react-router-dom';
// // // // import * as XLSX from 'xlsx';
// // // // import Button from '@mui/material/Button';
// // // // import Select from '@mui/material/Select';
// // // // import MenuItem from '@mui/material/MenuItem';
// // // // import FormControl from '@mui/material/FormControl';
// // // // import InputLabel from '@mui/material/InputLabel';
// // // // import TextField from '@mui/material/TextField';

// // // // const navbarStyle = {
// // // //   backgroundColor: '#1f4d7e',
// // // //   padding: '10px 10px',
// // // //   display: 'flex',
// // // //   justifyContent: 'space-between',
// // // //   alignItems: 'center',
// // // //   position: 'fixed',
// // // //   top: '0',
// // // //   width: '98%',
// // // //   zIndex: '1000',
// // // //   borderRadius: '15px 15px 15px 15px',
// // // //   marginTop: '5px',
// // // // };

// // // // const navbarTextStyle = {
// // // //   color: '#fff',
// // // //   fontSize: '26px',
// // // //   fontWeight: 'bold',
// // // // };

// // // // function TableData() {
// // // //   const { tableName } = useParams();
// // // //   const [tableData, setTableData] = useState([]);
// // // //   const [scannedData, setScannedData] = useState('');
// // // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // // //   const [selectedColumn, setSelectedColumn] = useState('');
// // // //   const [exportData, setExportData] = useState([]);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchTableData(tableName);
// // // //   }, [tableName]);

// // // //   useEffect(() => {
// // // //     if (scannedData && selectedColumn) {
// // // //       verifyData(scannedData);
// // // //       setScannedData('');
// // // //     }
// // // //   }, [scannedData, selectedColumn, tableData]);

// // // //   const fetchTableData = (tableName) => {
// // // //     fetch(`http://10.110.21.216:5000/data/${tableName}`)
// // // //       .then((response) => response.json())
// // // //       .then((data) => {
// // // //         setTableData(data);
// // // //         if (data.length > 0) {
// // // //           setSelectedColumn(Object.keys(data[0])[0]);
// // // //         }
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error(error);
// // // //       });
// // // //   };

// // // //   const verifyData = (dataToVerify) => {
// // // //     const matchingRow = tableData.find((row) => {
// // // //       if (selectedColumn === 'id') {
// // // //         return row[selectedColumn] === dataToVerify;
// // // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // // //         return true;
// // // //       }
// // // //       return false;
// // // //     });

// // // //     if (matchingRow) {
// // // //       const updatedTableData = tableData.map((row) =>
// // // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // // //       );
// // // //       setTableData(updatedTableData);
// // // //     }
// // // //   };

// // // //   const exportToExcel = (type) => {
// // // //     const filteredData = tableData.filter((row) => {
// // // //       if (type === 'verified') {
// // // //         return row.Status === 'Verified';
// // // //       } else if (type === 'notVerified') {
// // // //         return row.Status !== 'Verified';
// // // //       }
// // // //       return true;
// // // //     });
// // // //     const currentDate = new Date();
// // // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // // //     const wb = XLSX.utils.book_new();
// // // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // // //     XLSX.writeFile(wb, filename);
// // // //   };

// // // //   const saveAndExit = async () => {
// // // //     try {
// // // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // // //       const oldTableName = tableName;
// // // //       let newTableName;

// // // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // // //       } else {
// // // //         newTableName = oldTableName;
// // // //       }

// // // //       await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
// // // //         method: 'POST',
// // // //       });

// // // //       await Promise.all(
// // // //         tableData
// // // //           .filter((row) => row.Status === 'Verified')
// // // //           .map(async (row) => {
// // // //             await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
// // // //               method: 'POST',
// // // //               headers: {
// // // //                 'Content-Type': 'application/json',
// // // //               },
// // // //               body: JSON.stringify({ Status: 'Verified' }),
// // // //             });
// // // //           })
// // // //       );
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //     navigate('/PA1');
// // // //   };

// // // //   // Check if the user is logged in
// // // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // // //   // Redirect to login if not logged in
// // // //   useEffect(() => {
// // // //     if (!isLoggedIn) {
// // // //       navigate('/');
// // // //     }
// // // //   }, [isLoggedIn, navigate]);

// // // //   return (
// // // //     <div>
// // // //       {isLoggedIn ? (
// // // //         <div>
// // // //           <div style={navbarStyle}>
// // // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // // //             <div style={navbarTextStyle}>
// // // //               <span
// // // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // // //                 onClick={() => navigate('/')}
// // // //               >
// // // //                 LogOut
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // // //             <h2>File Data: {tableName}</h2>
// // // //             <div className="table-scroll">
// // // //               <table className='table'>
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <td>
// // // //                       <div>
// // // //                         <FormControl fullWidth variant="outlined">
// // // //                           <InputLabel>Select Column</InputLabel>
// // // //                           <Select
// // // //                             value={selectedColumn}
// // // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // // //                             label="Select Column"
// // // //                           >
// // // //                             {tableData.length > 0 &&
// // // //                               Object.keys(tableData[0]).map((key, index) => (
// // // //                                 <MenuItem key={index} value={key}>
// // // //                                   {key}
// // // //                                 </MenuItem>
// // // //                               ))}
// // // //                           </Select>
// // // //                         </FormControl>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Scan Product Name or Number"
// // // //                         variant="outlined"
// // // //                         value={scannedData}
// // // //                         onChange={(e) => setScannedData(e.target.value)}
// // // //                       />
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Manual Verification Data"
// // // //                         variant="outlined"
// // // //                         value={manualVerificationData}
// // // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // // //                         onKeyPress={(e) => {
// // // //                           if (e.key === 'Enter') {
// // // //                             verifyData(manualVerificationData);
// // // //                             setManualVerificationData('');
// // // //                           }
// // // //                         }}
// // // //                       />
// // // //                     </td>
// // // //                   </tr>
// // // //                 </thead>
// // // //               </table>
// // // //               <div className="table-content">
// // // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // // //                 <table className="table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       {tableData.length > 0 &&
// // // //                         Object.keys(tableData[0]).map((key, index) => (
// // // //                           <th key={index}>{key}</th>
// // // //                         ))}
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody>
// // // //                     {tableData.map((row, rowIndex) => (
// // // //                       <tr
// // // //                         key={rowIndex}
// // // //                         style={{
// // // //                           backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // // //                         }}
// // // //                       >
// // // //                         {Object.values(row).map((value, colIndex) => (
// // // //                           <td key={colIndex}>{value}</td>
// // // //                         ))}
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <p>User is not logged in</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default TableData;
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { useParams } from 'react-router-dom';
// // // // import * as XLSX from 'xlsx';
// // // // import Button from '@mui/material/Button';
// // // // import Select from '@mui/material/Select';
// // // // import MenuItem from '@mui/material/MenuItem';
// // // // import FormControl from '@mui/material/FormControl';
// // // // import InputLabel from '@mui/material/InputLabel';
// // // // import TextField from '@mui/material/TextField';

// // // // const navbarStyle = {
// // // //   backgroundColor: '#1f4d7e',
// // // //   padding: '10px 10px',
// // // //   display: 'flex',
// // // //   justifyContent: 'space-between',
// // // //   alignItems: 'center',
// // // //   position: 'fixed',
// // // //   top: '0',
// // // //   width: '98%',
// // // //   zIndex: '1000',
// // // //   borderRadius: '15px 15px 15px 15px',
// // // //   marginTop: '5px',
// // // // };

// // // // const navbarTextStyle = {
// // // //   color: '#fff',
// // // //   fontSize: '26px',
// // // //   fontWeight: 'bold',
// // // // };

// // // // function TableData() {
// // // //   const { tableName } = useParams();
// // // //   const [tableData, setTableData] = useState([]);
// // // //   const [scannedData, setScannedData] = useState('');
// // // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // // //   const [selectedColumn, setSelectedColumn] = useState('');
// // // //   const [exportData, setExportData] = useState([]);
// // // //   const [columnFilters, setColumnFilters] = useState({});
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     fetchTableData(tableName);
// // // //   }, [tableName]);

// // // //   useEffect(() => {
// // // //     if (scannedData && selectedColumn) {
// // // //       verifyData(scannedData);
// // // //       setScannedData('');
// // // //     }
// // // //   }, [scannedData, selectedColumn, tableData]);

// // // //   const fetchTableData = (tableName) => {
// // // //     fetch(`http://10.110.21.216:5000/data/${tableName}`)
// // // //       .then((response) => response.json())
// // // //       .then((data) => {
// // // //         setTableData(data);
// // // //         if (data.length > 0) {
// // // //           setSelectedColumn(Object.keys(data[0])[0]);
// // // //         }
// // // //       })
// // // //       .catch((error) => {
// // // //         console.error(error);
// // // //       });
// // // //   };

// // // //   const verifyData = (dataToVerify) => {
// // // //     const matchingRow = tableData.find((row) => {
// // // //       if (selectedColumn === 'id') {
// // // //         return row[selectedColumn] === dataToVerify;
// // // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // // //         return true;
// // // //       }
// // // //       return false;
// // // //     });

// // // //     if (matchingRow) {
// // // //       const updatedTableData = tableData.map((row) =>
// // // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // // //       );
// // // //       setTableData(updatedTableData);
// // // //     }
// // // //   };

// // // //   const exportToExcel = (type) => {
// // // //     const filteredData = tableData.filter((row) => {
// // // //       if (type === 'verified') {
// // // //         return row.Status === 'Verified';
// // // //       } else if (type === 'notVerified') {
// // // //         return row.Status !== 'Verified';
// // // //       }
// // // //       return true;
// // // //     });
// // // //     const currentDate = new Date();
// // // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // // //     const wb = XLSX.utils.book_new();
// // // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // // //     XLSX.writeFile(wb, filename);
// // // //   };

// // // //   const saveAndExit = async () => {
// // // //     try {
// // // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // // //       const oldTableName = tableName;
// // // //       let newTableName;

// // // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // // //       } else {
// // // //         newTableName = oldTableName;
// // // //       }

// // // //       await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
// // // //         method: 'POST',
// // // //       });

// // // //       await Promise.all(
// // // //         tableData
// // // //           .filter((row) => row.Status === 'Verified')
// // // //           .map(async (row) => {
// // // //             await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
// // // //               method: 'POST',
// // // //               headers: {
// // // //                 'Content-Type': 'application/json',
// // // //               },
// // // //               body: JSON.stringify({ Status: 'Verified' }),
// // // //             });
// // // //           })
// // // //       );
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //     }
// // // //     navigate('/PA1');
// // // //   };

// // // //   // Check if the user is logged in
// // // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // // //   // Redirect to login if not logged in
// // // //   useEffect(() => {
// // // //     if (!isLoggedIn) {
// // // //       navigate('/');
// // // //     }
// // // //   }, [isLoggedIn, navigate]);

// // // //   return (
// // // //     <div>
// // // //       {isLoggedIn ? (
// // // //         <div>
// // // //           <div style={navbarStyle}>
// // // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // // //             <div style={navbarTextStyle}>
// // // //               <span
// // // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // // //                 onClick={() => navigate('/')}
// // // //               >
// // // //                 LogOut
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // // //             <h2>File Data: {tableName}</h2>
// // // //             <div className="table-scroll">
// // // //               <table className='table'>
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <td>
// // // //                       <div>
// // // //                         <FormControl fullWidth variant="outlined">
// // // //                           <InputLabel>Select Column</InputLabel>
// // // //                           <Select
// // // //                             value={selectedColumn}
// // // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // // //                             label="Select Column"
// // // //                           >
// // // //                             {tableData.length > 0 &&
// // // //                               Object.keys(tableData[0]).map((key, index) => (
// // // //                                 <MenuItem key={index} value={key}>
// // // //                                   {key}
// // // //                                 </MenuItem>
// // // //                               ))}
// // // //                           </Select>
// // // //                         </FormControl>
// // // //                       </div>
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Scan Product Name or Number"
// // // //                         variant="outlined"
// // // //                         value={scannedData}
// // // //                         onChange={(e) => setScannedData(e.target.value)}
// // // //                       />
// // // //                     </td>
// // // //                     <td>
// // // //                       <TextField
// // // //                         fullWidth
// // // //                         label="Manual Verification Data"
// // // //                         variant="outlined"
// // // //                         value={manualVerificationData}
// // // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // // //                         onKeyPress={(e) => {
// // // //                           if (e.key === 'Enter') {
// // // //                             verifyData(manualVerificationData);
// // // //                             setManualVerificationData('');
// // // //                           }
// // // //                         }}
// // // //                       />
// // // //                     </td>
// // // //                   </tr>
// // // //                 </thead>
// // // //               </table>
// // // //               <div className="table-content">
// // // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // // //                 <table className="table">
// // // //                   <thead>
// // // //                     <tr>
// // // //                       {tableData.length > 0 &&
// // // //                         Object.keys(tableData[0]).map((key, index) => (
// // // //                           <th key={index}>
// // // //                             {key}
// // // //                             <br />
// // // //                             <TextField
// // // //                               fullWidth
// // // //                               label={`Filter ${key}`}
// // // //                               variant="outlined"
// // // //                               value={columnFilters[key] || ''}
// // // //                               onChange={(e) =>
// // // //                                 setColumnFilters({ ...columnFilters, [key]: e.target.value })
// // // //                               }
// // // //                             />
// // // //                           </th>
// // // //                         ))}
// // // //                     </tr>
// // // //                   </thead>
// // // //                     {tableData
// // // //                       .filter((row) => {
// // // //                         return Object.keys(columnFilters).every((column) => {
// // // //                           const filterValue = columnFilters[column];
// // // //                           if (filterValue === '') return true;
// // // //                           return String(row[column])
// // // //                             .toLowerCase()
// // // //                             .includes(filterValue.toLowerCase());
// // // //                         });
// // // //                       })
// // // //                       .map((row, rowIndex) => (
// // // //                         <tr
// // // //                           key={rowIndex}
// // // //                           style={{
// // // //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // // //                           }}
// // // //                         >
// // // //                           {Object.values(row).map((value, colIndex) => (
// // // //                             <td key={colIndex}>{value}</td>
// // // //                           ))}
// // // //                         </tr>
// // // //                       ))}
// // // //                 </table>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <p>User is not logged in</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default TableData;
// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { useParams } from 'react-router-dom';
// // // import * as XLSX from 'xlsx';
// // // import Button from '@mui/material/Button';
// // // import Select from '@mui/material/Select';
// // // import MenuItem from '@mui/material/MenuItem';
// // // import FormControl from '@mui/material/FormControl';
// // // import InputLabel from '@mui/material/InputLabel';
// // // import TextField from '@mui/material/TextField';

// // // const navbarStyle = {
// // //   backgroundColor: '#1f4d7e',
// // //   padding: '10px 10px',
// // //   display: 'flex',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'center',
// // //   position: 'fixed',
// // //   top: '0',
// // //   width: '98%',
// // //   zIndex: '1000',
// // //   borderRadius: '15px 15px 15px 15px',
// // //   marginTop: '5px',
// // // };

// // // const navbarTextStyle = {
// // //   color: '#fff',
// // //   fontSize: '26px',
// // //   fontWeight: 'bold',
// // // };

// // // function TableData() {
// // //   const { tableName } = useParams();
// // //   const [tableData, setTableData] = useState([]);
// // //   const [scannedData, setScannedData] = useState('');
// // //   const [manualVerificationData, setManualVerificationData] = useState('');
// // //   const [selectedColumn, setSelectedColumn] = useState('');
// // //   const [exportData, setExportData] = useState([]);
// // //   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
// // //   const [columnFilters, setColumnFilters] = useState({});
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     fetchTableData(tableName);
// // //   }, [tableName]);

// // //   useEffect(() => {
// // //     if (scannedData && selectedColumn) {
// // //       verifyData(scannedData);
// // //       setScannedData('');
// // //     }
// // //   }, [scannedData, selectedColumn, tableData]);

// // //   const fetchTableData = (tableName) => {
// // //     fetch(`http://10.110.21.216:5000/data/${tableName}`)
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         setTableData(data);
// // //         if (data.length > 0) {
// // //           setSelectedColumn(Object.keys(data[0])[0]);
// // //         }
// // //       })
// // //       .catch((error) => {
// // //         console.error(error);
// // //       });
// // //   };

// // //   const verifyData = (dataToVerify) => {
// // //     const matchingRow = tableData.find((row) => {
// // //       if (selectedColumn === 'id') {
// // //         return row[selectedColumn] === dataToVerify;
// // //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// // //         return true;
// // //       }
// // //       return false;
// // //     });

// // //     if (matchingRow) {
// // //       const updatedTableData = tableData.map((row) =>
// // //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// // //       );
// // //       setTableData(updatedTableData);
// // //     }
// // //   };

// // //   const exportToExcel = (type) => {
// // //     const filteredData = tableData.filter((row) => {
// // //       if (type === 'verified') {
// // //         return row.Status === 'Verified';
// // //       } else if (type === 'notVerified') {
// // //         return row.Status !== 'Verified';
// // //       }
// // //       return true;
// // //     });
// // //     const currentDate = new Date();
// // //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// // //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// // //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// // //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// // //     const ws = XLSX.utils.json_to_sheet(filteredData);
// // //     const wb = XLSX.utils.book_new();
// // //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// // //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// // //     XLSX.writeFile(wb, filename);
// // //   };

// // //   const saveAndExit = async () => {
// // //     try {
// // //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// // //       const oldTableName = tableName;
// // //       let newTableName;

// // //       if (oldTableName.includes('_unfinished') && allVerified) {
// // //         newTableName = oldTableName.replace('_unfinished', '_verified');
// // //       } else if (oldTableName.includes('_verified') && !allVerified) {
// // //         newTableName = oldTableName.replace('_verified', '_unfinished');
// // //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// // //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// // //       } else {
// // //         newTableName = oldTableName;
// // //       }

// // //       await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
// // //         method: 'POST',
// // //       });

// // //       await Promise.all(
// // //         tableData
// // //           .filter((row) => row.Status === 'Verified')
// // //           .map(async (row) => {
// // //             await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
// // //               method: 'POST',
// // //               headers: {
// // //                 'Content-Type': 'application/json',
// // //               },
// // //               body: JSON.stringify({ Status: 'Verified' }),
// // //             });
// // //           })
// // //       );
// // //     } catch (error) {
// // //       console.error(error);
// // //     }
// // //     navigate('/PA1');
// // //   };

// // //   // Check if the user is logged in
// // //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// // //   // Redirect to login if not logged in
// // //   useEffect(() => {
// // //     if (!isLoggedIn) {
// // //       navigate('/');
// // //     }
// // //   }, [isLoggedIn, navigate]);

// // //   return (
// // //     <div>
// // //       {isLoggedIn ? (
// // //         <div>
// // //           <div style={navbarStyle}>
// // //             <div style={navbarTextStyle}>SEBN,TN</div>
// // //             <div style={navbarTextStyle}>
// // //               <span
// // //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// // //                 onClick={() => navigate('/')}
// // //               >
// // //                 LogOut
// // //               </span>
// // //             </div>
// // //           </div>
// // //           <div className="table-container" style={{ marginTop: '70px' }}>
// // //             <h2>File Data: {tableName}</h2>
// // //             <div className="table-scroll">
// // //               <table className='table'>
// // //                 <thead>
// // //                   <tr>
// // //                     <td>
// // //                       <div>
// // //                         <FormControl fullWidth variant="outlined">
// // //                           <InputLabel>Select Column</InputLabel>
// // //                           <Select
// // //                             value={selectedColumn}
// // //                             onChange={(e) => setSelectedColumn(e.target.value)}
// // //                             label="Select Column"
// // //                           >
// // //                             {tableData.length > 0 &&
// // //                               Object.keys(tableData[0]).map((key, index) => (
// // //                                 <MenuItem key={index} value={key}>
// // //                                   {key}
// // //                                 </MenuItem>
// // //                               ))}
// // //                           </Select>
// // //                         </FormControl>
// // //                       </div>
// // //                     </td>
// // //                     <td>
// // //                       <TextField
// // //                         fullWidth
// // //                         label="Scan Product Name or Number"
// // //                         variant="outlined"
// // //                         value={scannedData}
// // //                         onChange={(e) => setScannedData(e.target.value)}
// // //                       />
// // //                     </td>
// // //                     <td>
// // //                       <TextField
// // //                         fullWidth
// // //                         label="Manual Verification Data"
// // //                         variant="outlined"
// // //                         value={manualVerificationData}
// // //                         onChange={(e) => setManualVerificationData(e.target.value)}
// // //                         onKeyPress={(e) => {
// // //                           if (e.key === 'Enter') {
// // //                             verifyData(manualVerificationData);
// // //                             setManualVerificationData('');
// // //                           }
// // //                         }}
// // //                       />
// // //                     </td>
// // //                     {/* Add Status filter */}
                    
// // //                   </tr>
// // //                 </thead>
// // //               </table>
// // //               <div className="table-content">
// // //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// // //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// // //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// // //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// // //                 <table className="table">
// // //                   <thead>
// // //                     <tr>
// // //                       {tableData.length > 0 &&
// // //                         Object.keys(tableData[0]).map((key, index) => (
// // //                           <th key={index}>
// // //                             {key}
// // //                             <br />
// // //                             <TextField
// // //                               fullWidth
// // //                               label={`Filter ${key}`}
// // //                               variant="outlined"
// // //                               value={columnFilters[key] || ''}
// // //                               onChange={(e) =>
// // //                                 setColumnFilters({ ...columnFilters, [key]: e.target.value })
// // //                               }
// // //                             />
// // //                           </th>
// // //                         ))}
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {tableData
// // //                       .filter((row) => {
// // //                         return (
// // //                           Object.keys(columnFilters).every((column) => {
// // //                             const filterValue = columnFilters[column];
// // //                             if (filterValue === '') return true;
// // //                             return (
// // //                               String(row[column])
// // //                                 .toLowerCase()
// // //                                 .includes(filterValue.toLowerCase()) &&
// // //                               (statusFilter === '' || row['Status'] === statusFilter)
// // //                             );
// // //                           }) &&
// // //                           (statusFilter === '' || row['Status'] === statusFilter)
// // //                         );
// // //                       })
// // //                       .map((row, rowIndex) => (
// // //                         <tr
// // //                           key={rowIndex}
// // //                           style={{
// // //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// // //                           }}
// // //                         >
// // //                           {Object.values(row).map((value, colIndex) => (
// // //                             <td key={colIndex}>{value}</td>
// // //                           ))}
// // //                         </tr>
// // //                       ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <p>User is not logged in</p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default TableData;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useParams } from 'react-router-dom';
// // import * as XLSX from 'xlsx';
// // import Button from '@mui/material/Button';
// // import Select from '@mui/material/Select';
// // import MenuItem from '@mui/material/MenuItem';
// // import FormControl from '@mui/material/FormControl';
// // import InputLabel from '@mui/material/InputLabel';
// // import TextField from '@mui/material/TextField';

// // const navbarStyle = {
// //   backgroundColor: '#1f4d7e',
// //   padding: '10px 10px',
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'center',
// //   position: 'fixed',
// //   top: '0',
// //   width: '98%',
// //   zIndex: '1000',
// //   borderRadius: '15px 15px 15px 15px',
// //   marginTop: '5px',
// // };

// // const navbarTextStyle = {
// //   color: '#fff',
// //   fontSize: '26px',
// //   fontWeight: 'bold',
// // };

// // function TableData() {
// //   const { tableName } = useParams();
// //   const [tableData, setTableData] = useState([]);
// //   const [scannedData, setScannedData] = useState('');
// //   const [manualVerificationData, setManualVerificationData] = useState('');
// //   const [selectedColumn, setSelectedColumn] = useState('');
// //   const [exportData, setExportData] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
// //   const [columnFilters, setColumnFilters] = useState({});
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchTableData(tableName);
// //   }, [tableName]);

// //   useEffect(() => {
// //     if (scannedData && selectedColumn) {
// //       verifyData(scannedData);
// //       setScannedData('');
// //     }
// //   }, [scannedData, selectedColumn, tableData]);

// //   const fetchTableData = (tableName) => {
// //     fetch(`http://10.110.21.216:5000/data/${tableName}`)
// //       .then((response) => response.json())
// //       .then((data) => {
// //         setTableData(data);
// //         if (data.length > 0) {
// //           setSelectedColumn(Object.keys(data[0])[0]);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   };

// //   const verifyData = (dataToVerify) => {
// //     const matchingRow = tableData.find((row) => {
// //       if (selectedColumn === 'id') {
// //         return row[selectedColumn] === dataToVerify;
// //       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
// //         return true;
// //       }
// //       return false;
// //     });

// //     if (matchingRow) {
// //       const updatedTableData = tableData.map((row) =>
// //         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
// //       );
// //       setTableData(updatedTableData);
// //     }
// //   };

// //   const exportToExcel = (type) => {
// //     const filteredData = tableData.filter((row) => {
// //       if (type === 'verified') {
// //         return row.Status === 'Verified';
// //       } else if (type === 'notVerified') {
// //         return row.Status !== 'Verified';
// //       }
// //       return true;
// //     });
// //     const currentDate = new Date();
// //     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
// //       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
// //       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
// //       currentDate.getMinutes().toString().padStart(2, '0')}`;
// //     const ws = XLSX.utils.json_to_sheet(filteredData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

// //     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

// //     XLSX.writeFile(wb, filename);
// //   };

// //   const saveAndExit = async () => {
// //     try {
// //       const allVerified = tableData.every((row) => row.Status === 'Verified');
// //       const oldTableName = tableName;
// //       let newTableName;

// //       if (oldTableName.includes('_unfinished') && allVerified) {
// //         newTableName = oldTableName.replace('_unfinished', '_verified');
// //       } else if (oldTableName.includes('_verified') && !allVerified) {
// //         newTableName = oldTableName.replace('_verified', '_unfinished');
// //       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
// //         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
// //       } else {
// //         newTableName = oldTableName;
// //       }

// //       await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
// //         method: 'POST',
// //       });

// //       await Promise.all(
// //         tableData
// //           .filter((row) => row.Status === 'Verified')
// //           .map(async (row) => {
// //             await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
// //               method: 'POST',
// //               headers: {
// //                 'Content-Type': 'application/json',
// //               },
// //               body: JSON.stringify({ Status: 'Verified' }),
// //             });
// //           })
// //       );
// //     } catch (error) {
// //       console.error(error);
// //     }
// //     navigate('/PA1');
// //   };

// //   // Check if the user is logged in
// //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// //   // Redirect to login if not logged in
// //   useEffect(() => {
// //     if (!isLoggedIn) {
// //       navigate('/');
// //     }
// //   }, [isLoggedIn, navigate]);

// //   return (
// //     <div>
// //       {isLoggedIn ? (
// //         <div>
// //           <div style={navbarStyle}>
// //             <div style={navbarTextStyle}>SEBN,TN</div>
// //             <div style={navbarTextStyle}>
// //               <span
// //                 style={{ fontSize: '18px', cursor: 'pointer' }}
// //                 onClick={() => navigate('/')}
// //               >
// //                 LogOut
// //               </span>
// //             </div>
// //           </div>
// //           <div className="table-container" style={{ marginTop: '70px' }}>
// //             <h2>File Data: {tableName}</h2>
// //             <div className="table-scroll">
// //               <table className='table'>
// //                 <thead>
// //                   <tr>
// //                     <td>
// //                       <div>
// //                         <FormControl fullWidth variant="outlined">
// //                           <InputLabel>Select Column</InputLabel>
// //                           <Select
// //                             value={selectedColumn}
// //                             onChange={(e) => setSelectedColumn(e.target.value)}
// //                             label="Select Column"
// //                           >
// //                             {tableData.length > 0 &&
// //                               Object.keys(tableData[0]).map((key, index) => (
// //                                 <MenuItem key={index} value={key}>
// //                                   {key}
// //                                 </MenuItem>
// //                               ))}
// //                           </Select>
// //                         </FormControl>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <TextField
// //                         fullWidth
// //                         label="Scan Product Name or Number"
// //                         variant="outlined"
// //                         value={scannedData}
// //                         onChange={(e) => setScannedData(e.target.value)}
// //                       />
// //                     </td>
// //                     <td>
// //                       <TextField
// //                         fullWidth
// //                         label="Manual Verification Data"
// //                         variant="outlined"
// //                         value={manualVerificationData}
// //                         onChange={(e) => setManualVerificationData(e.target.value)}
// //                         onKeyPress={(e) => {
// //                           if (e.key === 'Enter') {
// //                             verifyData(manualVerificationData);
// //                             setManualVerificationData('');
// //                           }
// //                         }}
// //                       />
// //                     </td>
// //                   </tr>
// //                 </thead>
// //               </table>
// //               <div className="table-content">
// //                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
// //                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
// //                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
// //                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
// //                 <table className="table">
// //                   <thead>
// //                     <tr>
// //                       {tableData.length > 0 &&
// //                         Object.keys(tableData[0]).map((key, index) => (
// //                           <th key={index}>
// //                             {key}
// //                             <br />
// //                             {key === 'Status' ? ( // Check if the column is 'Status'
// //                               <FormControl fullWidth variant="outlined">
// //                                 <InputLabel>Status</InputLabel>
// //                                 <Select
// //                                   value={statusFilter}
// //                                   onChange={(e) => setStatusFilter(e.target.value)}
// //                                   label="Status"
// //                                 >
// //                                   <MenuItem value="">All</MenuItem>
// //                                   <MenuItem value="Verified">Verified</MenuItem>
// //                                   <MenuItem value="Not Verified">Not Verified</MenuItem>
// //                                 </Select>
// //                               </FormControl>
// //                             ) : (
// //                               <TextField
// //                                 fullWidth
// //                                 label={`Filter ${key}`}
// //                                 variant="outlined"
// //                                 value={columnFilters[key] || ''}
// //                                 onChange={(e) =>
// //                                   setColumnFilters({ ...columnFilters, [key]: e.target.value })
// //                                 }
// //                               />
// //                             )}
// //                           </th>
// //                         ))}
// //                     </tr>
// //                   </thead>
                
// //                     {tableData
// //                       .filter((row) => {
// //                         return (
// //                           Object.keys(columnFilters).every((column) => {
// //                             const filterValue = columnFilters[column];
// //                             if (filterValue === '') return true;
// //                             return (
// //                               String(row[column])
// //                                 .toLowerCase()
// //                                 .includes(filterValue.toLowerCase()) &&
// //                               (statusFilter === '' || row['Status'] === statusFilter)
// //                             );
// //                           }) &&
// //                           (statusFilter === '' || row['Status'] === statusFilter)
// //                         );
// //                       })
// //                       .map((row, rowIndex) => (
// //                         <tr
// //                           key={rowIndex}
// //                           style={{
// //                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
// //                           }}
// //                         >
// //                           {Object.values(row).map((value, colIndex) => (
// //                             <td key={colIndex}>{value}</td>
// //                           ))}
// //                         </tr>
// //                       ))}
                 
// //                 </table>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       ) : (
// //         <p>User is not logged in</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default TableData;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';

// const navbarStyle = {
//   backgroundColor: '#1f4d7e',
//   padding: '10px 10px',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   position: 'fixed',
//   top: '0',
//   width: '98%',
//   zIndex: '1000',
//   borderRadius: '15px 15px 15px 15px',
//   marginTop: '5px',
// };

// const navbarTextStyle = {
//   color: '#fff',
//   fontSize: '26px',
//   fontWeight: 'bold',
// };

// function TableData() {
//   const { tableName } = useParams();
//   const [tableData, setTableData] = useState([]);
//   const [scannedData, setScannedData] = useState('');
//   const [manualVerificationData, setManualVerificationData] = useState('');
//   const [selectedColumn, setSelectedColumn] = useState('');
//   const [exportData, setExportData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
//   const [columnFilters, setColumnFilters] = useState({});
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchTableData(tableName);
//   }, [tableName]);

//   useEffect(() => {
//     if (scannedData && selectedColumn) {
//       verifyData(scannedData);
//       setScannedData('');
//     }
//   }, [scannedData, selectedColumn, tableData]);

//   const fetchTableData = (tableName) => {
//     fetch(`http://10.110.21.216:5000/data/${tableName}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setTableData(data);
//         if (data.length > 0) {
//           setSelectedColumn(Object.keys(data[0])[0]);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const verifyData = (dataToVerify) => {
//     const matchingRow = tableData.find((row) => {
//       if (selectedColumn === 'id') {
//         return row[selectedColumn] === dataToVerify;
//       } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
//         return true;
//       }
//       return false;
//     });

//     if (matchingRow) {
//       const updatedTableData = tableData.map((row) =>
//         row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
//       );
//       setTableData(updatedTableData);
//     } else {
//       setError('Data not found in the table.');
//     }
//   };

//   const exportToExcel = (type) => {
//     const filteredData = tableData.filter((row) => {
//       if (type === 'verified') {
//         return row.Status === 'Verified';
//       } else if (type === 'notVerified') {
//         return row.Status !== 'Verified';
//       }
//       return true;
//     });
//     const currentDate = new Date();
//     const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${
//       (currentDate.getMonth() + 1).toString().padStart(2, '0')}-${
//       currentDate.getFullYear()} ${currentDate.getHours().toString().padStart(2, '0')}:${
//       currentDate.getMinutes().toString().padStart(2, '0')}`;
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     const filename = `${tableName}_${type}_data_${formattedDate}.xlsx`;

//     XLSX.writeFile(wb, filename);
//   };

//   const saveAndExit = async () => {
//     try {
//       const allVerified = tableData.every((row) => row.Status === 'Verified');
//       const oldTableName = tableName;
//       let newTableName;

//       if (oldTableName.includes('_unfinished') && allVerified) {
//         newTableName = oldTableName.replace('_unfinished', '_verified');
//       } else if (oldTableName.includes('_verified') && !allVerified) {
//         newTableName = oldTableName.replace('_verified', '_unfinished');
//       } else if (!oldTableName.includes('_unfinished') && !oldTableName.includes('_verified')) {
//         newTableName = allVerified ? `${oldTableName}_verified` : `${oldTableName}_unfinished`;
//       } else {
//         newTableName = oldTableName;
//       }

//       await fetch(`http://10.110.21.216:5000/renameTable/${oldTableName}/${newTableName}`, {
//         method: 'POST',
//       });

//       await Promise.all(
//         tableData
//           .filter((row) => row.Status === 'Verified')
//           .map(async (row) => {
//             await fetch(`http://10.110.21.216:5000/updateStatus/${newTableName}/${row.id}`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({ Status: 'Verified' }),
//             });
//           })
//       );
//     } catch (error) {
//       console.error(error);
//     }
//     navigate('/PA1');
//   };

//   // Check if the user is logged in
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

//   // Redirect to login if not logged in
//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/');
//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <div style={navbarStyle}>
//             <div style={navbarTextStyle}>SEBN,TN</div>
//             <div style={navbarTextStyle}>
//               <span
//                 style={{ fontSize: '18px', cursor: 'pointer' }}
//                 onClick={() => navigate('/')}
//               >
//                 LogOut
//               </span>
//             </div>
//           </div>
//           <div className="table-container" style={{ marginTop: '70px' }}>
//             <h2>File Data: {tableName}</h2>
//             <div className="table-scroll">
//               <table className='table'>
//                 <thead>
//                   <tr>
//                     <td>
//                       <div>
//                         <FormControl fullWidth variant="outlined">
//                           <InputLabel>Select Column</InputLabel>
//                           <Select
//                             value={selectedColumn}
//                             onChange={(e) => setSelectedColumn(e.target.value)}
//                             label="Select Column"
//                           >
//                             {tableData.length > 0 &&
//                               Object.keys(tableData[0]).map((key, index) => (
//                                 <MenuItem key={index} value={key}>
//                                   {key}
//                                 </MenuItem>
//                               ))}
//                           </Select>
//                         </FormControl>
//                       </div>
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Scan Product Name or Number"
//                         variant="outlined"
//                         value={scannedData}
//                         onChange={(e) => setScannedData(e.target.value)}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                     <td>
//                       <TextField
//                         fullWidth
//                         label="Manual Verification Data"
//                         variant="outlined"
//                         value={manualVerificationData}
//                         onChange={(e) => setManualVerificationData(e.target.value)}
//                         onKeyPress={(e) => {
//                           if (e.key === 'Enter') {
//                             verifyData(manualVerificationData);
//                             setManualVerificationData('');
//                           }
//                         }}
//                       />
//                       {error && <p style={{ color: 'red' }}>{error}</p>}
//                     </td>
//                   </tr>
//                 </thead>
//               </table>
//               <div className="table-content">
//                 <Button onClick={() => exportToExcel('verified')}>Export Verified Data</Button>
//                 <Button onClick={() => exportToExcel('notVerified')}>Export Not Verified Data</Button>
//                 <Button onClick={() => exportToExcel('allData')}>Export All Data</Button>
//                 <Button onClick={() => saveAndExit()}>Save and Exit</Button>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       {tableData.length > 0 &&
//                         Object.keys(tableData[0]).map((key, index) => (
//                           <th key={index}>
//                             {key}
//                             <br />
//                             {key === 'Status' ? ( // Check if the column is 'Status'
//                               <FormControl fullWidth variant="outlined">
//                                 <InputLabel>Status</InputLabel>
//                                 <Select
//                                   value={statusFilter}
//                                   onChange={(e) => setStatusFilter(e.target.value)}
//                                   label="Status"
//                                 >
//                                   <MenuItem value="">All</MenuItem>
//                                   <MenuItem value="Verified">Verified</MenuItem>
//                                   <MenuItem value="Not Verified">Not Verified</MenuItem>
//                                 </Select>
//                               </FormControl>
//                             ) : (
//                               <TextField
//                                 fullWidth
//                                 label={`Filter ${key}`}
//                                 variant="outlined"
//                                 value={columnFilters[key] || ''}
//                                 onChange={(e) =>
//                                   setColumnFilters({ ...columnFilters, [key]: e.target.value })
//                                 }
//                               />
//                             )}
//                           </th>
//                         ))}
//                     </tr>
//                   </thead>
//                     {tableData
//                       .filter((row) => {
//                         return (
//                           Object.keys(columnFilters).every((column) => {
//                             const filterValue = columnFilters[column];
//                             if (filterValue === '') return true;
//                             return (
//                               String(row[column])
//                                 .toLowerCase()
//                                 .includes(filterValue.toLowerCase()) &&
//                               (statusFilter === '' || row['Status'] === statusFilter)
//                             );
//                           }) &&
//                           (statusFilter === '' || row['Status'] === statusFilter)
//                         );
//                       })
//                       .map((row, rowIndex) => (
//                         <tr
//                           key={rowIndex}
//                           style={{
//                             backgroundColor: row.Status === 'Verified' ? '#90EE90' : 'white',
//                           }}
//                         >
//                           {Object.values(row).map((value, colIndex) => (
//                             <td key={colIndex}>{value}</td>
//                           ))}
//                         </tr>
//                       ))}
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>User is not logged in</p>
//       )}
//     </div>
//   );
// }

// export default TableData;
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

const navbarStyle = {
  backgroundColor: '#1f4d7e',
  padding: '10px 10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '0',
  width: '98%',
  zIndex: '1000',
  borderRadius: '15px 15px 15px 15px',
  marginTop: '5px',
};

const navbarTextStyle = {
  color: '#fff',
  fontSize: '26px',
  fontWeight: 'bold',
};

function TableData() {
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [scannedData, setScannedData] = useState('');
  const [manualVerificationData, setManualVerificationData] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [exportData, setExportData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(''); // Added statusFilter state
  const [columnFilters, setColumnFilters] = useState({});
  const [error, setError] = useState('');
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
      } else if (row[selectedColumn] && row[selectedColumn] === dataToVerify) {
        return true;
      }
      return false;
    });

    if (matchingRow) {
      const updatedTableData = tableData.map((row) =>
        row.id === matchingRow.id ? { ...row, Status: 'Verified' } : row
      );
      setTableData(updatedTableData);
    } else {
      setError('Data not found in the file.');
      // Remove the error message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const exportToExcel = (type) => {
    const filteredData = tableData.filter((row) => {
      if (type === 'verified') {
        return row.Status === 'Verified';
      } else if (type === 'notVerified') {
        return row.Status !== 'Verified';
      }
      return true;
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
      const allVerified = tableData.every((row) => row.Status === 'Verified');
      const oldTableName = tableName;
      let newTableName;

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

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div style={navbarStyle}>
            <div style={navbarTextStyle}>SEBN,TN</div>
            <div style={navbarTextStyle}>
              <span
                style={{ fontSize: '18px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                LogOut
              </span>
            </div>
          </div>
          <div className="table-container" style={{ marginTop: '70px' }}>
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
                      {error && <p style={{ color: 'red' }}>{error}</p>}
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
                      {error && <p style={{ color: 'red' }}>{error}</p>}
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
                          <th key={index}>
                            {key}
                            <br />
                            {key === 'Status' ? ( // Check if the column is 'Status'
                              <FormControl fullWidth variant="outlined">
                                <InputLabel>Status</InputLabel>
                                <Select
                                  value={statusFilter}
                                  onChange={(e) => setStatusFilter(e.target.value)}
                                  label="Status"
                                >
                                  <MenuItem value="">All</MenuItem>
                                  <MenuItem value="Verified">Verified</MenuItem>
                                  <MenuItem value="Not Verified">Not Verified</MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              <TextField
                                fullWidth
                                label={`Filter ${key}`}
                                variant="outlined"
                                value={columnFilters[key] || ''}
                                onChange={(e) =>
                                  setColumnFilters({ ...columnFilters, [key]: e.target.value })
                                }
                              />
                            )}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  
                    {tableData
                      .filter((row) => {
                        return (
                          Object.keys(columnFilters).every((column) => {
                            const filterValue = columnFilters[column];
                            if (filterValue === '') return true;
                            return (
                              String(row[column])
                                .toLowerCase()
                                .includes(filterValue.toLowerCase()) &&
                              (statusFilter === '' || row['Status'] === statusFilter)
                            );
                          }) &&
                          (statusFilter === '' || row['Status'] === statusFilter)
                        );
                      })
                      .map((row, rowIndex) => (
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
      ) : (
        <p>User is not logged in</p>
      )}
    </div>
  );
}

export default TableData;
