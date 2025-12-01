import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../../styles/admin.css";
import { useState,useEffect } from "react";
import axios from "axios";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658","#948594"];
export function Dashboard() {
  const [data, setData] = useState([]);
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
    fetchStats();
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
            290 <br /> Total Users
          </h1>
        </div>
      </div>
      <div className="dashboard-orders">
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <h5>Clothes</h5>
          <p>black suit</p>
          <p>black suit</p>
          <p>black suit</p>
          <p>black suit</p>
        </div>
        <div className="total-orders">
          <h2>Total Orders</h2>
          <h1>
            77 <br />
            Total Orders In
          </h1>
        </div>
      </div>
    </div>
  );
}
