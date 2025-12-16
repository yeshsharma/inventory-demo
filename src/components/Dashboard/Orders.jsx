import React, { useEffect, useState } from "react";
import { inventoryService } from "../../services/inventory.service";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);

    const result = await inventoryService.getOrders();

    if (result.success) {
      setOrders(result.data);
    } else {
      setError(result.message || "Failed to load orders");
    }

    setLoading(false);
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-page">
      <h1>Orders</h1>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>SKU</th>
            <th>QTY</th>

            <th>Status</th>
            <th>PRO Number</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.orderItems.map((item) => item.sku).join(", ")}</td>
              <td>{order.orderItems?.length || 0}</td>
              <td>{order.status}</td>
              <td>{order.proNumber}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
