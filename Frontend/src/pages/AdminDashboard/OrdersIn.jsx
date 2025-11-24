import axios from "axios";
import React, { useEffect, useState } from "react";

export function OrdersIn() {
  const [ordersIn, setOrdersIn] = useState([]);

  useEffect(() => {
    async function getAllOrders() {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrdersIn(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        alert("Error fetching orders");
      }
    }
    getAllOrders();
  }, []);

  return (
    <div className="orders-in">
      <h1>Orders In</h1>
      {ordersIn.map((order) => (
        <div key={order._id} className="order">
          <h3>Order ID: {order._id}</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item">
              <img src={item.image} alt="cloth" width="100" />
              <p>Description: {item.description}</p>
              <p>Size: {item.size}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
}
