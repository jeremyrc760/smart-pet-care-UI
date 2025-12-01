// src/components/FeedCard.jsx
import React from "react";

function FeedCard({ onFeed }) {

  return (
    <div className="feed-card">
      <button 
        onClick={onFeed}
        style={{ padding: "12px 20px", fontSize: 18, cursor: "pointer" }}
      >
        Feed
      </button>
    </div>
  );
}

export default FeedCard;
