import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import NotebookJournal from "./components/NotebookJournal";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage"; // Added LandingPage import

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshToggle, setRefreshToggle] = useState(false);
  // Initial state is set to 'landing' so the animation screen shows first.
  const [activeComponent, setActiveComponent] = useState("landing");

  const fetchEntries = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/entries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries, refreshToggle]);

  const refreshList = () => setRefreshToggle((prev) => !prev);

  return (
    <div className="App">
      {/* Header component handles navigation state */}
      <Header setActiveComponent={setActiveComponent} />

      <div className="full-page-container">
        {/* Conditional rendering based on activeComponent state */}

        {activeComponent === "landing" && <LandingPage />}

        {activeComponent === "journal" && (
          <NotebookJournal refreshList={refreshList} />
        )}

        {activeComponent === "dashboard" && (
          <Dashboard
            entries={entries}
            loading={loading}
            refreshList={refreshList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
