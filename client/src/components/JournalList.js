import React, { useState } from "react"; // REMOVED useEffect, useCallback
import "./JournalList.css";

// RECEIVE ENTRIES AND REFRESH FUNCTION AS PROPS
function JournalList({ entries, refreshList }) {
  // KEEP Edit state here since it only affects this component's view
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/entries/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log(`Entry ID ${id} deleted successfully.`);
        refreshList(); // CALL PROP FUNCTION TO REFRESH APP.JS DATA
      } else {
        console.error("Failed to delete entry.");
      }
    } catch (error) {
      console.error("Network error during deletion:", error);
    }
  };

  const startEdit = (entry) => {
    setEditingId(entry.id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:5000/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      if (response.ok) {
        console.log(`Entry ID ${id} updated successfully.`);
        setEditingId(null);
        refreshList(); // CALL PROP FUNCTION TO REFRESH APP.JS DATA
      } else {
        console.error("Failed to update entry.");
      }
    } catch (error) {
      console.error("Network error during update:", error);
    }
  };

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          {editingId === entry.id ? (
            // --- EDIT MODE FORM ---
            <form onSubmit={(e) => handleUpdate(e, entry.id)}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
                rows="4"
              />
              <div className="edit-actions">
                <button type="submit" className="save-edit-button">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="cancel-edit-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // --- VIEW MODE ---
            <>
              <div className="card-header">
                <h3>{entry.title}</h3>
                <div className="card-actions">
                  <button
                    className="edit-button"
                    onClick={() => startEdit(entry)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="entry-date">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <p>{entry.content}</p>
              <p
                className={`sentiment ${
                  entry.sentiment_score > 0.05
                    ? "positive"
                    : entry.sentiment_score < -0.05
                    ? "negative"
                    : "neutral"
                }`}
              >
                Sentiment Score: **{entry.sentiment_score.toFixed(4)}**
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// REMOVE THE EXPORTED forceJournalListRefresh FUNCTION

export default JournalList;
