function WaterCard({ waterLevel, waterThreshold, onAddWater }) {
  const isLow = waterLevel < waterThreshold;

  return (
    <div className="card">
      <h2>Water Level</h2>
      <div className="row">
        <div>
          <span className={`lamp ${isLow ? "blue" : "green"}`}></span>
          <span>{isLow ? "Low Water" : "Normal"}</span>
        </div>
        <div className="metric">
          Level: <span>{waterLevel}</span>%
        </div>
      </div>
      <button onClick={onAddWater} disabled={!isLow}>
        Add Water
      </button>
      <p style={{ fontSize: "13px", opacity: 0.8 }}>
        Below 30% triggers refill permission.
      </p>
    </div>
  );
}

export default WaterCard;
