import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './FileList.css'; // Assuming you have a CSS file for styling

function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch list of uploaded files from the server
    fetch('/files')
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h1>Uploaded Files</h1>
      <div className="button-container">
        {/* Link to the upload page */}
        <Link to="/upload" className="upload-button">
          Upload Files
        </Link>
        {/* Link to the page for showing uploaded files */}
        <Link to="/show-files" className="show-files-button">
          Show Uploaded Files
        </Link>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.filename}>
            <Link to={`/show/${file.filename}`}>{file.filename}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
