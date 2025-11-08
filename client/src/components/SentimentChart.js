import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import "./SentimentChart.css";

// Custom Tooltip component to show more info
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // payload can contain multiple lines (positive and negative), we grab the original data from the first one
    const entryData = payload.find(
      (p) =>
        p.dataKey === "sentiment_score_positive" ||
        p.dataKey === "sentiment_score_negative"
    )?.payload;

    // Safety check
    if (!entryData) return null;

    return (
      <div className="custom-tooltip">
        <p className="tooltip-date">{new Date(label).toLocaleDateString()}</p>
        <p className="tooltip-title">**{entryData.title}**</p>
        {/* Display the actual, single sentiment score */}
        <p className="tooltip-score">
          Sentiment: **{entryData.sentiment_score.toFixed(4)}**
        </p>
      </div>
    );
  }
  return null;
};

function SentimentChart({ entries }) {
  // 1. Prepare Data: Sort and format for chart
  const chartData = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((entry) => ({
      ...entry,
      date: new Date(entry.date).getTime(), // Use timestamp for linear X-axis
      // 2. Prepare Data: Duplicate sentiment score for positive and negative lines
      sentiment_score_positive:
        entry.sentiment_score >= 0 ? entry.sentiment_score : 0,
      sentiment_score_negative:
        entry.sentiment_score < 0 ? entry.sentiment_score : 0,

      // This is needed for the original single-line tooltip logic
      sentiment_score: entry.sentiment_score,
    }));

  return (
    <div className="sentiment-chart-container">
      <h3>Sentiment Trend Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          animationDuration={1500}
          animationEasing="ease-in-out"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* Y-Axis: Sentiment Score (-1.0 to 1.0) */}
          <YAxis domain={[-1.0, 1.0]} tickCount={5} stroke="#718096" />

          {/* X-Axis: Time/Date */}
          <XAxis
            dataKey="date"
            type="number"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleDateString()
            }
            stroke="#718096"
          />

          <Tooltip content={<CustomTooltip />} />

          {/* CRITICAL: Reference line at Y=0 (Neutral) */}
          <ReferenceLine y={0} stroke="#a0aec0" strokeDasharray="5 5" />

          {/* 1. POSITIVE/NEUTRAL LINE: Only shows score >= 0 */}
          <Line
            type="monotone"
            dataKey="sentiment_score_positive"
            stroke="#3182ce" /* BLUE */
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            connectNulls={true} /* Important for continuity */
          />

          {/* 2. NEGATIVE LINE: Only shows score < 0 */}
          <Line
            type="monotone"
            dataKey="sentiment_score_negative"
            stroke="#e53e3e" /* RED */
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            isAnimationActive={true}
            connectNulls={true} /* Important for continuity */
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SentimentChart;
