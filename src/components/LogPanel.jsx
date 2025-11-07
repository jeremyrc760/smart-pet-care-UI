import React from 'react';

function LogPanel({ logs = [] }) {   // ✅ 默认值 []
  return (
    <div className="card">
      <h2>Activity Logs</h2>
      {logs.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No logs yet.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LogPanel;
