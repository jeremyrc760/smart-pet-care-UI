import React, { useRef, useState } from "react";

function CameraCard({ className }) {
  const videoRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [status, setStatus] = useState("Camera Off");

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
      setStatus("Streaming");
    } catch (err) {
      console.error("Camera access denied:", err);
      setStatus("Permission Denied");
    }
  };

  const handleCloseCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOn(false);
    setStatus("Idle");
  };

  return (
    <div className={`card camera-card ${className || ""}`}>
      <h2>Camera</h2>
      <p>
        Status:{" "}
        <strong style={{ color: cameraOn ? "#22c55e" : "#ccc" }}>{status}</strong>
      </p>

      {!cameraOn ? (
        <button onClick={handleOpenCamera}>📷 Open Camera</button>
      ) : (
        <button className="off" onClick={handleCloseCamera}>
          🚫 Close Camera
        </button>
      )}

      {/* 视频区域 */}
      <div style={{ marginTop: "10px" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            borderRadius: "10px",
            background: "#000",
            minHeight: "240px",
            objectFit: "cover",
          }}
        ></video>
      </div>
    </div>
  );
}

export default CameraCard;
