import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

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
  const insertData = () => {
    const data = parseFileContent();
    console.log(data)
    const url = `http://localhost:5005/insertData`
    const Credentials = data
    axios.post(url, Credentials)
        .then(response => {
            const result = response.data;
            const { status, message, data } = result;
            if ( response.status !== 200) {
                alert("failed")
            }
            else {
                alert("Succes")
            }
        })
        .catch(err => {
            console.log(err)
        })
       
}


  return (
    <div className='table-responsive'>
      <input type="file" onChange={handleFileChange} />
      {fileContent && <button onClick={insertData}>insert data into database</button>}
     
    </div>
  );
};

export default App;
