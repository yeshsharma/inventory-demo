// components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { inventoryService } from "../../services/inventory.service";
import EditModal from "./EditModal";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  // Fetch inventory data when component mounts

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    const result = await inventoryService.getInventory();
    console.log("Fetched Inventory Result:", result);
    if (result.success) {
      setInventory(result.data);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);
  // Handle edit action
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const logout = () => {
    authService.logout();
    window.location.reload();
  };

  // Handle successful update
  const handleUpdateSuccess = () => {
    handleCloseModal();
    fetchInventory(); // Refresh the inventory list
  };

  // Show loading state
  if (loading) {
    return <div className="loading">Loading inventory...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={fetchInventory}>Retry</button>
      </div>
    );
  }

  const order = () => {
    navigate("/orders");
  };

  // Render inventory table
  return (
    <div className="dashboard">
      <div className="flex justify-between items-center">
        <div>
          <h1>Inventory Dashboard</h1>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <div>
            <button className="logout" onClick={logout}>
              {" "}
              LOGOUT
            </button>
          </div>
          <div>
            <button className="order" onClick={order}>
              {" "}
              Orders
            </button>
          </div>
        </div>
      </div>
      <div className="inventory-stats">
        <p>Total Items: {inventory.length}</p>
        <p>
          Total Quantity:{" "}
          {inventory.reduce(
            (sum, item) => sum + parseInt(item.quantity || 0),
            0,
          )}
        </p>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Description</th>
            <th>Material</th>
            <th>Color</th>
            <th>Dimensions</th>
            <th>Quantity</th>
            <th>Booked</th>
            <th>In Hand</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.sku}</td>
              <td>{item.vendorDescription}</td>
              <td>{item.materialType}</td>
              <td>{item.materialColor}</td>
              <td>
                {item.length && `L: ${item.length}`}
                {item.width && ` × W: ${item.width}`}
                {item.radius && ` × R: ${item.radius}`}
              </td>
              <td>{item.quantity}</td>
              <td>{item.quantity - item.inHandQuantity}</td>
              <td>{item.inHandQuantity}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                  title="Edit item"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal
          item={editingItem}
          onClose={handleCloseModal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
