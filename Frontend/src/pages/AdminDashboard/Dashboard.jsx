import React from "react";
import Cloth from "../../../../Backend/node_modules/models/cloth.model";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Wedding", value: 20 },
  { name: "Business", value: 10 },
  { name: "Old Styles", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-upper">
        <div className="dashboard-total-clothes">
          <h2>Total Clothes</h2>
          <PieChart width={350} height={250}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
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
