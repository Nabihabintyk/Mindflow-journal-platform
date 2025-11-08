import React, { useState } from "react";
import JournalList from "./JournalList";
import SentimentChart from "./SentimentChart";
import "./Dashboard.css"; // New CSS file for the dashboard toggles

function Dashboard({ entries, handleDelete, loading, refreshList }) {
  // State to manage which view is currently active
  const [activeView, setActiveView] = useState("list"); // 'list' or 'chart'

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Journal Dashboard</h2>

      <div className="toggle-buttons">
        <button
          className={`toggle-button ${activeView === "list" ? "active" : ""}`}
          onClick={() => setActiveView("list")}
        >
          View All Entries ({entries.length})
        </button>
        <button
          className={`toggle-button ${activeView === "chart" ? "active" : ""}`}
          onClick={() => setActiveView("chart")}
          disabled={entries.length < 2}
        >
          {/* Disable chart view if there aren't enough points */}
          Sentiment Trend Chart 📊
        </button>
      </div>

      <div className="view-content">
        {activeView === "list" && (
          <JournalList
            entries={entries}
            handleDelete={handleDelete}
            refreshList={refreshList}
          />
        )}

        {activeView === "chart" && entries.length >= 2 && (
          <SentimentChart entries={entries} />
        )}

        {/* Message for chart if not enough data */}
        {activeView === "chart" && entries.length < 2 && (
          <p className="no-data-message">
            Submit at least two entries to view the sentiment trend chart!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
