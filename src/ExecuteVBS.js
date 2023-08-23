import React from 'react';
import axios from 'axios';
import App from './Readtxt';
const VBScriptExecution = () => {
 
var c=0
    const executeVBScript = () => {
        //here we will get all employee data
        const url = `http://localhost:5001/run-script`
        axios.get(url)
            .then(response => {
                console.log('VBScript executed successfully');
                c=1
            })
            .catch(err => {
                console.error('Error executing VBScript:', err);
                c=0
            })
    }
   
    

  return (
    <div>
      <button onClick={executeVBScript}>Execute VBScript</button>
      <button onClick={App}>Show Data</button>
    </div>
  );
};

export default VBScriptExecution;
