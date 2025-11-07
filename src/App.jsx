import React, { useState } from "react";
import FeedCard from "./components/FeedCard.jsx";
import WaterCard from "./components/WaterCard.jsx";
import EnvCard from "./components/EnvCard.jsx";
import CameraCard from "./components/CameraCard.jsx";
import LogPanel from "./components/LogPanel.jsx";
import "./App.css";

function App() {
  const [pressure, setPressure] = useState(0.45);
  const feedThreshold = 0.5;

  const handleAddFood = () => {
    setPressure((prev) => Math.min(prev + 0.3, 1.0)); // 模拟加食物
  };

  return (
    <div className="app">
      {/* ✅ 新增容器，用来让标题和卡片组整体居中 */}
      <div className="dashboard-container">
        <h1 className="dashboard-title">Smart Feeder Dashboard</h1>

        {/* ✅ 顶部三块卡片 */}
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

        {/* ✅ 底部两块卡片 */}
        <div className="card-grid bottom-row">
          <CameraCard />
          <LogPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
