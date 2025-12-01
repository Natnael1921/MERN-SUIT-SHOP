import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../../styles/admin.css";
import { useState, useEffect } from "react";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#948594"];
export function Dashboard() {
  const [data, setData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get("http://localhost:5000/api/clothes/stats");
        console.log("Stats response:", res.data);
        if (res.data.success) setData(res.data.data);
      } catch (err) {
        console.error("Error fetching cloth stats:", err);
      }
    }
    async function fetchDashboardStats() {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/stats/dashboard"
        );
        if (res.data.success) {
          setTotalUsers(res.data.totalUsers);
          setTotalOrders(res.data.totalOrders);
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    }
    async function fetchRecentOrders() {
      try {
        const res = await axios.get("http://localhost:5000/api/orders/recent");
        if (res.data.success) setRecentOrders(res.data.data);
      } catch (err) {
        console.error("Error fetching recent orders:", err);
      }
    }

    fetchStats();
    fetchDashboardStats();
    fetchRecentOrders();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-upper">
        <div className="dashboard-total-clothes">
          <h2>Total Clothes</h2>
          <PieChart width={450} height={210}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="dashboard-total-users">
          <h2>Total users</h2>
          <h1>
            {totalUsers} <br /> Users
          </h1>
        </div>
      </div>
      <div className="dashboard-orders">
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          {recentOrders.map((name, idx) => (
            <p key={idx}>{name}</p>
          ))}
        </div>

        <div className="total-orders">
          <h2>Total Orders</h2>
          <h1>
            {totalOrders} <br /> Orders
          </h1>
        </div>
      </div>
    </div>
  );
}
