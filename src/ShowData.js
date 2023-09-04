import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ShowData() {
  const { filename } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data for the specified file from the server
    fetch(`/api/show/${filename}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [filename]);

  return (
    <div>
      <h1>Data for {filename}</h1>
      <table>
        <thead>
          {/* Render table headers */}
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {/* Render table data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;
