import React from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <Link to="/dashboard/analytics">Analytics</Link> |
        <Link to="/dashboard/settings">Settings</Link>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Dashboard;
