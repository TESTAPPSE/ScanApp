// import React, { Component } from 'react';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: null,
//     };
//   }

//   handleFileUpload = (event) => {
//     this.setState({ file: event.target.files[0] });
//   };

//   uploadFile = () => {
//     const formData = new FormData();
//     formData.append('file', this.state.file);

//     fetch('http://10.110.21.216:5000/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((message) => {
//         console.log(message);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <input type="file" onChange={this.handleFileUpload} />
//         <button onClick={this.uploadFile}>Upload</button>
//       </div>
//     );
//   }
// }

// export default App;
// import React, { useState, useEffect } from 'react';

// function App() {
//   const [file, setFile] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [tableNames, setTableNames] = useState([]);

//   useEffect(() => {
//     // Fetch the list of uploaded files and table names when the component mounts
    
//     fetchTableNames();
//   }, []);

//   const handleFileUpload = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const uploadFile = () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     fetch('http://10.110.21.216:5000/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.text())
//       .then((message) => {
//         console.log(message);
//         // After uploading, fetch the list of uploaded files again
//         fetchUploadedFiles();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const fetchUploadedFiles = () => {
//     fetch('http://10.110.21.216:5000/files')
//       .then((response) => response.json())
//       .then((data) => {
//         setUploadedFiles(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const fetchTableNames = () => {
//     fetch('http://10.110.21.216:5000/tables')
//       .then((response) => response.json())
//       .then((data) => {
//         setTableNames(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       <button onClick={uploadFile}>Upload</button>

//       <h2>Uploaded Files:</h2>
//       <ul>
//         {uploadedFiles.map((file) => (
//           <li key={file.filename}>
//             {file.filename} - Uploaded at {new Date(file.uploadedAt).toLocaleString()}
//           </li>
//         ))}
//       </ul>

//       <h2>Table Names:</h2>
//       <ul>
//         {tableNames.map((tableName, index) => (
//           <li key={index}>{tableName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './DataTable.css'; // Import the CSS file
import Button from '@mui/material/Button';
import ConfirmationDialog from './ConfirmationDialog';
function App() {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [tableNames, setTableNames] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded files and table names when the component mounts
    fetchUploadedFiles();
    fetchTableNames();
  }, []);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://10.110.21.216:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        // After uploading, fetch the list of uploaded files again
        fetchUploadedFiles();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUploadedFiles = () => {
    fetch('http://10.110.21.216:5000/files')
      .then((response) => response.json())
      .then((data) => {
        setUploadedFiles(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTableNames = () => {
    fetch('http://10.110.21.216:5000/tables')
      .then((response) => response.json())
      .then((data) => {
        setTableNames(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTableData = (tableName) => {
    fetch(`http://10.110.21.216:5000/data/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        setSelectedTable(tableName);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTable = (tableName) => {
    // Add a confirmation dialog if needed
    fetch(`http://10.110.21.216:5000/delete/${tableName}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        // Table deleted, refresh the list of tables
        fetchTableNames();
        setSelectedTable(null);
        setTableData([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadFile}>Upload</button>

      <h2>Uploaded Files:</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.filename}>
            {file.filename} - Uploaded at {new Date(file.uploadedAt).toLocaleString()}
          </li>
        ))}
      </ul>

      <h2>Table Names:</h2>
      <ul>
        {tableNames.map((tableName, index) => (
          <li key={index}>
            {tableName}{' '}
            <button onClick={() => fetchTableData(tableName)}>Show Data</button>{' '}
            <button onClick={() => deleteTable(tableName)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedTable && (
        <div className="table-container">
          <h2>Table Data: {selectedTable}</h2>
          <table  className="table">
            <thead>
              <tr>
                {Object.keys(tableData[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
