import React from "react";
import JournalList from "./JournalList";

function Dashboard({ entries, refreshList }) {
  return (
    <div className="dashboard">
      <h2>Your Entries</h2>
      <JournalList entries={entries} refreshList={refreshList} />
    </div>
  );
}

export default Dashboard;
