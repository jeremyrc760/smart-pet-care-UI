// src/components/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import PubNub from "pubnub";

import FeedCard from "./FeedCard";
import EnvCard from "./EnvCard";
import CameraCard from "./CameraCard";
import LogPanel from "./LogPanel";

// ==============================================================================
// 频道定义 - 必须与 pi_feeder_client.py 中的定义一致！
// ==============================================================================
const TELEMETRY_CHANNEL = 'feeder_telemetry';  // Pi -> UI (数据和日志)
const COMMAND_CHANNEL   = 'feeder_commands';   // UI -> Pi (指令)

// PubNub 实例创建 (在组件外部或使用 useRef/useMemo确保单例)
const pubnub = new PubNub({
    // 使用您提供的密钥
    publishKey: "pub-c-bce173dd-2da9-49b9-abf1-61ef013d03bc",
    subscribeKey: "sub-c-e8b5b690-0a4d-4f67-9763-a84c0e0414a2",
    uuid: "smartfeeder-ui",
});

function Dashboard() {
    // 1. 状态管理：遥测数据 (温度, 湿度, 水位)
    const [telemetryData, setTelemetryData] = useState({
        temperature: '--',
        humidity: '--',
        waterLevel: '--',
        lastUpdate: null,
    });
    
    // 2. 状态管理：日志数组
    const [logEntries, setLogEntries] = useState(["[App] Dashboard initialized.", "[PubNub] Connecting..."]);

    // ==============================================================================
    // PubNub 发布指令函数 (Memoized 以确保稳定)
    // ==============================================================================
    const handleFeedCommand = useCallback(() => {
        const message = { 
            command: "feed_now", // 必须与 pi_feeder_client.py 期望的指令一致
            timestamp: Date.now() 
        };
        
        // 发布到 COMMAND 频道
        pubnub.publish({
            channel: COMMAND_CHANNEL,
            message: message,
        }, (status, response) => {
            if (status.error) {
                console.error("Publish Error:", status);
                setLogEntries(prev => [...prev, `[ERROR] 指令发布失败: ${status.error.message}`]);
            } else {
                setLogEntries(prev => [...prev, `[UI] 指令 'feed_now' 发送成功。`]);
            }
        });
    }, []);

    // ==============================================================================
    // PubNub 订阅监听器 (useEffect 只运行一次)
    // ==============================================================================
    useEffect(() => {
        // 订阅遥测频道 (数据和日志都通过此频道)
        pubnub.subscribe({ channels: [TELEMETRY_CHANNEL] });

        const listener = {
            status: (status) => {
                if (status.category === "PNConnectedCategory") {
                    setLogEntries(prev => [...prev, "[PubNub] 连接成功，订阅频道就绪。"]);
                }
            },
            message: (msg) => {
                const data = msg.message;
                
                // 检查是否为日志消息 (我们在 Pi 脚本中用 'log' 字段标记)
                if (data.log) {
                    setLogEntries(prev => [...prev, data.log]);
                } 
                // 检查是否为传感器遥测数据
                else if (data.temperature !== undefined) {
                    setTelemetryData({
                        temperature: data.temperature,
                        humidity: data.humidity,
                        waterLevel: data.water_level, // 注意：Pi 脚本中使用的是 water_level
                        lastUpdate: new Date(),
                    });
                }
            },
        };

        pubnub.addListener(listener);

        // 清理函数：组件卸载时移除监听器并取消订阅
        return () => {
            pubnub.removeListener(listener);
            pubnub.unsubscribeAll();
        };
    }, []); // 依赖数组为空，确保只在挂载时运行一次


    return (
        <div className="dashboard">
            {/* 1. 喂食卡片：接收指令处理函数 */}
            <FeedCard 
                onFeed={handleFeedCommand} 
                lastFeedStatus={logEntries.slice(-1)[0]} // 传递最近一条日志作为状态反馈
            />

            {/* 2. 环境卡片：接收实时遥测数据 */}
            <EnvCard 
                temperature={telemetryData.temperature}
                humidity={telemetryData.humidity}
                lastUpdate={telemetryData.lastUpdate}
                waterLevel={telemetryData.waterLevel}
            />

            {/* 3. 摄像头卡片 */}
            <CameraCard />

            {/* 4. 日志面板：接收日志数组 */}
            <LogPanel logs={logEntries} />
        </div>
    );
}

export default Dashboard;