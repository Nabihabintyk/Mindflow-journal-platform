import React, { useState } from "react";
import "./NotebookJournal.css";
// REMOVE: import SaveButton from './SaveButton';

function NotebookJournal({ refreshList }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Entry submitted successfully! ID: ${data.id}`);
        setTitle("");
        setContent("");
        refreshList();
      } else {
        setMessage(`Failed to submit entry: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Network error. Check if the Flask server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="notebook-wrapper">
      <h2 className="notebook-title">New Journal Entry</h2>
      <div className="notebook-page">
        {/* NEW: Inner container for padding */}
        <div className="notebook-inner"></div>
        <form onSubmit={handleSubmit} className="notebook-form">
          <input
            type="text"
            placeholder=" Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="notebook-input title-line"
            disabled={isSubmitting}
          />

          <textarea
            placeholder="Start journaling here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="notebook-input content-lines"
            disabled={isSubmitting}
          ></textarea>

          <div className="journal-actions">
            {/* REPLACED with standard button but using modular styling */}
            <button
              type="submit"
              className="save-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
      {message && <p className="submission-message">{message}</p>}
    </div>
  );
}

export default NotebookJournal;
