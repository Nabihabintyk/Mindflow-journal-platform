import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SentimentChart({ entries }) {
  const [animatedData, setAnimatedData] = useState([0, 0, 0]);

  useEffect(() => {
    const POSITIVE_THRESHOLD = 0.2;
    const NEGATIVE_THRESHOLD = -0.2;

    const getSentiment = (score) => {
      if (score >= POSITIVE_THRESHOLD) return "positive";
      if (score <= NEGATIVE_THRESHOLD) return "negative";
      return "neutral";
    };

    const positiveEntries = entries.filter(
      (e) => getSentiment(e.sentiment_score) === "positive"
    );
    const negativeEntries = entries.filter(
      (e) => getSentiment(e.sentiment_score) === "negative"
    );
    const neutralEntries = entries.filter(
      (e) => getSentiment(e.sentiment_score) === "neutral"
    );

    const targetData = [
      positiveEntries.length,
      negativeEntries.length,
      neutralEntries.length,
    ];

    // Animate bars gradually
    const duration = 1500;
    const fps = 60;
    const steps = Math.ceil((duration / 1000) * fps);
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      const easeOutBounce = (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        else if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        else if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        else return n1 * (t -= 2.625 / d1) * t + 0.984375;
      };

      const easedProgress = easeOutBounce(progress);
      setAnimatedData(
        targetData.map((value) => Math.round(value * easedProgress))
      );

      if (step >= steps) clearInterval(interval);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [entries]);

  // Prepare lists
  const POSITIVE_THRESHOLD = 0.2;
  const NEGATIVE_THRESHOLD = -0.2;
  const getSentimentOutside = (score) => {
    if (score >= POSITIVE_THRESHOLD) return "positive";
    if (score <= NEGATIVE_THRESHOLD) return "negative";
    return "neutral";
  };

  const positiveEntries = entries.filter(
    (e) => getSentimentOutside(e.sentiment_score) === "positive"
  );
  const negativeEntries = entries.filter(
    (e) => getSentimentOutside(e.sentiment_score) === "negative"
  );
  const neutralEntries = entries.filter(
    (e) => getSentimentOutside(e.sentiment_score) === "neutral"
  );

  const data = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        label: "Number of Entries",
        data: animatedData,
        backgroundColor: ["#A8E6CF", "#FF8B94", "#D3D3D3"], // pastel colors
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Sentiment Analysis" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  // Custom pastel list card styling
  const listCardStyle = (bgColor) => ({
    backgroundColor: bgColor,
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    fontFamily: "'Poppins', sans-serif",
    color: "#333333",
  });

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <Bar data={data} options={options} />

      <div style={{ marginTop: "20px" }}>
        {positiveEntries.length > 0 && (
          <div style={listCardStyle("#A8E6CF")}>
            <h3 style={{ color: "#2E7D32" }}>Positive Entries</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {positiveEntries.map((e) => (
                <li key={e.id}>{e.title}</li>
              ))}
            </ul>
          </div>
        )}

        {negativeEntries.length > 0 && (
          <div style={listCardStyle("#FF8B94")}>
            <h3 style={{ color: "#C62828" }}>Negative Entries</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {negativeEntries.map((e) => (
                <li key={e.id}>{e.title}</li>
              ))}
            </ul>
          </div>
        )}

        {neutralEntries.length > 0 && (
          <div style={listCardStyle("#D3D3D3")}>
            <h3 style={{ color: "#555555" }}>Neutral Entries</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {neutralEntries.map((e) => (
                <li key={e.id}>{e.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SentimentChart;
