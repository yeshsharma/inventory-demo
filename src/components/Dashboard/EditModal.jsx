// components/EditModal.jsx
import React, { useState } from "react";
import { inventoryService } from "../../services/inventory.service";

const EditModal = ({ item, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    vendorDescription: item.vendorDescription || "",
    stripInsert: item.stripInsert || "",
    shape: item.shape || "",
    materialType: item.materialType || "",
    materialColor: item.materialColor || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare payload with all required fields including id
    const updateData = {
      id: item.id, // Include id in the payload
      vendorDescription: formData.vendorDescription,
      stripInsert: formData.stripInsert,
      shape: formData.shape,
      materialType: formData.materialType,
      materialColor: formData.materialColor,
    };

    console.log("Sending update payload:", updateData);

    const result = await inventoryService.updateInventory(updateData);

    if (result.success) {
      onUpdateSuccess();
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Inventory Item</h2>
          <button className="close-btn" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          {/* Vendor Description (Read-only/Auto-filled) */}
          <div className="form-group">
            <label htmlFor="vendorDescription">Vendor Description</label>
            <input
              type="text"
              id="vendorDescription"
              name="vendorDescription"
              value={formData.vendorDescription}
              disabled
              className="readonly-input"
            />
          </div>

          {/* Strip Insert (Editable) */}
          <div className="form-group">
            <label htmlFor="stripInsert">Strip Insert</label>
            <input
              type="text"
              id="stripInsert"
              name="stripInsert"
              value={formData.stripInsert}
              onChange={handleChange}
              placeholder="Enter strip insert"
            />
          </div>

          {/* Shape (Editable) */}
          <div className="form-group">
            <label htmlFor="shape">Shape</label>
            <input
              type="text"
              id="shape"
              name="shape"
              value={formData.shape}
              onChange={handleChange}
              placeholder="Enter shape"
            />
          </div>

          {/* Material Type (Editable) */}
          <div className="form-group">
            <label htmlFor="materialType">Material Type</label>
            <input
              type="text"
              id="materialType"
              name="materialType"
              value={formData.materialType}
              onChange={handleChange}
              placeholder="Enter material type"
            />
          </div>

          {/* Material Color (Read-only/Auto-filled) */}
          <div className="form-group">
            <label htmlFor="materialColor">Material Color</label>
            <input
              type="text"
              id="materialColor"
              name="materialColor"
              value={formData.materialColor}
              disabled
              className="readonly-input"
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="update-btn" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
