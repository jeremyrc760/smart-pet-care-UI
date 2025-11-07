function FeedCard({ pressure = 0, feedThreshold = 0.5, onAddFood }) {
  const isLow = pressure < feedThreshold;

  return (
    <div className="card">
      <h2>Feeding Status</h2>
      <div className="row">
        <div>
          <span className={`lamp ${isLow ? "red" : "green"}`}></span>
          <span>{isLow ? "Needs Refill" : "Normal"}</span>
        </div>
        <div className="metric">
          Weight: <span>{pressure.toFixed(2)}</span> kg
        </div>
      </div>
      <button onClick={onAddFood} disabled={!isLow}>
        Add Food
      </button>
      <p style={{ fontSize: "13px", opacity: 0.8 }}>
        Below 0.50 kg triggers refill alert.
      </p>
    </div>
  );
}

export default FeedCard;
