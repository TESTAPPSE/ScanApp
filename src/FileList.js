// client/src/components/FileList.js
import React, { useEffect, useState } from 'react';

function FileList({ history }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetch('http://10.110.21.216:5000/api/files')
      .then((response) => response.json())
      .then((data) => setUploadedFiles(data))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  const showData = (filename) => {
    history.push(`/show/${filename}`);
  };

  return (
    <div>
      <h1>Uploaded Files</h1>
      <table>
        <thead>
          <tr>
            <th>Filename</th>
            <th>Uploaded At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uploadedFiles.map((file) => (
            <tr key={file.filename}>
              <td>{file.filename}</td>
              <td>{new Date(file.uploadedAt).toLocaleString()}</td>
              <td>
                <button onClick={() => showData(file.filename)}>Show Data</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;
