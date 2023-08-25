import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css'; // Import the CSS file
import Navbar from './Navbar';
import * as XLSX from 'xlsx'; // Import the xlsx library
import Button from '@mui/material/Button';
import ConfirmationDialog from './ConfirmationDialog'; // Import the ConfirmationDialog component

const DataTable = () => {
  const ip = '10.110.21.216';

  const [data, setData] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  useEffect(() => {
    // Replace with your backend API URL
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://` + ip + `:5005/read`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (itemId, initialQuantity) => {
    // Set the editing item ID and initial quantity
    setEditingItemId(itemId);
    setNewQuantity(initialQuantity);
  };

  const handleSaveClick = async (itemId) => {
    try {
      // Send a PUT request to update the quantity for the specified item
      await axios.put(`http://` + ip + `:5005/update/${itemId}`, {
        newQuantity,
      });

      // Clear editing state
      setEditingItemId(null);
      setNewQuantity('');

      // Fetch and update the data from the server after update
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      // Send a DELETE request to remove the item from the server
      await axios.delete(`http://` + ip + `:5005/delete/${itemIdToDelete}`);

      // Fetch and update the data from the server after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      // Close the confirmation dialog
      setShowDeleteConfirmation(false);
    }
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    // Create a new array with only the desired columns
    const filteredData = data.map((item) => ({
      Product: item.Product,
      "Scanned Quantity": item.Quantity,
      "Scan date": item.date,
    }));

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ScannedData");
    XLSX.writeFile(wb, "ScannedData.xlsx");
  };

  return (
    <div>
      <Navbar />
      <div className="table-container">
        <h2>Scanned Data</h2>
        {/* Add an export button */}
        <Button onClick={exportToExcel}>Export to Excel</Button>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Scanned Quantity</th>
              <th>Scan date</th>
              <th>Action</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.Product}</td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                    />
                  ) : (
                    item.Quantity
                  )}
                </td>
                <td>{item.date}</td>
                <td>
                  {editingItemId === item.id ? (
                    <>
                      <Button onClick={() => handleSaveClick(item.id)}>Save</Button>
                      <Button onClick={() => setEditingItemId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditClick(item.id, item.Quantity)}>Edit</Button>
                      <Button onClick={() => {
                        setItemIdToDelete(item.id);
                        setShowDeleteConfirmation(true);
                      }}>Delete</Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show the confirmation dialog when needed */}
      <ConfirmationDialog
        open={showDeleteConfirmation}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
};

export default DataTable;
