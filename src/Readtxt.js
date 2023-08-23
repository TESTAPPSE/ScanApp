import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

const App = () => {
  const [fileContent, setFileContent] = useState('');


  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      setFileContent(content);
    };

    reader.readAsText(selectedFile);
  };

  const parseFileContent = () => {
    // Split the file content by line break
    const lines = fileContent.split('\n');

    // Extract column names from the first line
    const columnNames = lines[0].split('\t');

    // Parse the data into an array of objects using column names as keys
    const data = lines.slice(1).map((line) => {
      const values = line.split('\t');
      const item = {};

      columnNames.forEach((columnName, index) => {
        item[columnName] = values[index];
      });

      return item;
    });

    return data;
  };
  const renderTable = () => {
    const data = parseFileContent();

    return (
      <div className='table-responsive'>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(data).map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}

            </tr>
          ))}
        </tbody>
      </Table>
      
      </div>
    );
  };

  return (
    <div className='table-responsive'>
      <input type="file" onChange={handleFileChange} />
      {fileContent && renderTable()}
     
    </div>
  );
};

export default App;
