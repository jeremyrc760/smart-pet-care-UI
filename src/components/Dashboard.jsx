import React, { useState } from "react";
import FeedCard from "./FeedCard.jsx";
import WaterCard from "./WaterCard.jsx";
import EnvCard from "./EnvCard.jsx";
import CameraCard from "./CameraCard.jsx";
import LogPanel from "./LogPanel.jsx";
import "../App.css"; // 注意路径往上一级

function Dashboard({ onLogout }) {
  const [pressure, setPressure] = useState(0.45);
  const feedThreshold = 0.5;

  const handleAddFood = () => {
    setPressure((prev) => Math.min(prev + 0.3, 1.0)); // 模拟加食物
  };

  return (
    <div className="app">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Smart Feeder Dashboard</h1>
          {/* ✅ 新增 Logout 按钮 */}
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="card-grid top-row">
          <FeedCard
            pressure={pressure}
            feedThreshold={feedThreshold}
            onAddFood={handleAddFood}
          />
          <WaterCard
            waterLevel={45}
            waterThreshold={30}
            onAddWater={() => alert("Add water")}
          />
          <EnvCard />
        </div>

        <div className="card-grid bottom-row">
          <CameraCard />
          <LogPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
