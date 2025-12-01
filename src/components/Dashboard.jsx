// src/components/Dashboard.jsx
import React, { useEffect } from "react";
import PubNub from "pubnub";

import FeedCard from "./FeedCard";
import EnvCard from "./EnvCard";
import CameraCard from "./CameraCard";
import LogPanel from "./LogPanel";

function Dashboard() {

  // 创建 PubNub 实例（只创建一次）
  const pubnub = new PubNub({
    publishKey: "YOUR_PUB_KEY",
    subscribeKey: "YOUR_SUB_KEY",
    uuid: "smartfeeder-ui",
  });

  // 你也可以监听来自树莓派的反馈（可选）
  useEffect(() => {
    pubnub.subscribe({ channels: ["smartfeeder"] });

    pubnub.addListener({
      message: (msg) => {
        console.log("Received from Pi:", msg.message);
      },
    });
  }, []);

  // 喂食动作由 Dashboard 统一管理
  const handleFeedCommand = () => {
    pubnub.publish({
      channel: "smartfeeder",
      message: { command: "feed" },
    });
  };

  return (
    <div className="dashboard">

      {/* 喂食卡片 */}
      <FeedCard onFeed={handleFeedCommand} />

      {/* 其他模块按你原来的结构 */}
      <EnvCard />
      <CameraCard />
      <LogPanel />

    </div>
  );
}

export default Dashboard;
