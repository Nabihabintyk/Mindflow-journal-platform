import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header";
import NotebookJournal from "./components/NotebookJournal";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import JournalList from "./components/JournalList";
import SentimentChart from "./components/SentimentChart";

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [activeComponent, setActiveComponent] = useState("landing");

  const fetchEntries = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/entries");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched entries:", data); // <- check this
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
      <Header setActiveComponent={setActiveComponent} />

      <div className="full-page-container">
        {/* LANDING PAGE */}
        {activeComponent === "landing" && <LandingPage />}

        {/* NEW ENTRY PAGE */}
        {activeComponent === "journal" && (
          <NotebookJournal refreshList={refreshList} />
        )}

        {/* ENTRIES PAGE */}
        {activeComponent === "entries" && (
          <JournalList
            entries={entries}
            handleDelete={() => {}}
            refreshList={refreshList}
          />
        )}

        {/* SENTIMENT CHART PAGE */}
        {activeComponent === "chart" && <SentimentChart entries={entries} />}

        {/* LEGACY DASHBOARD PAGE (optional, if you still want it) */}
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
