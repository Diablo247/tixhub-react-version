import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // ✅ Load session and user info
    const session = JSON.parse(localStorage.getItem("ticketapp_session"));
    const user = session?.user || session;
    if (!user) return;

    setUserName(user.name || "User");

    // ✅ Load this user's tickets
    const userTickets =
      JSON.parse(localStorage.getItem(`ticketapp_tickets_${user.email}`)) || [];

    // ✅ Compute stats
    const total = userTickets.length;
    const open = userTickets.filter((t) => t.status === "open").length;
    const inProgress = userTickets.filter(
      (t) => t.status === "in_progress"
    ).length;
    const closed = userTickets.filter((t) => t.status === "closed").length;

    setStats({ total, open, inProgress, closed });
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/login");
  };

  // ✅ Navigate to tickets with optional filter
  const goToTickets = (status) => {
    navigate("/tickets", { state: { filterStatus: status } });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <div className="header-container">
            <div className="header-content">
              <h3>Welcome, {userName}!</h3>
              <p>Here’s a quick overview of your tickets.</p>
            </div>

            <div className="dashboard-actions">
              <button
                onClick={() => goToTickets("all")}
                className="btn-primary"
              >
                Tickets
              </button>

              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Stats Grid */}
        <div className="stats-container">
          <div
            className="stat-card total grid-item"
            onClick={() => goToTickets("all")}
          >
            <p>{stats.total}</p>
            <h3>Total Tickets</h3>
          </div>

          <div
            className="stat-card open grid-item"
            onClick={() => goToTickets("open")}
          >
            <p>{stats.open}</p>
            <h3>Open</h3>
          </div>

          <div
            className="stat-card in-progress grid-item"
            onClick={() => goToTickets("in_progress")}
          >
            <p>{stats.inProgress}</p>
            <h3>In Progress</h3>
          </div>

          <div
            className="stat-card closed grid-item"
            onClick={() => goToTickets("closed")}
          >
            <p>{stats.closed}</p>
            <h3>Closed</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
