/* src/components/Layout.css */
:root {
    --bg-color: #1a1a2e; /* 深蓝背景 */
    --card-bg: #22223b; /* 卡片背景 */
    --text-color: #e4e4f7;
    --primary-color: #7952b3; /* 紫色/蓝色主色调 */
    --success-color: #4CAF50;
    --idle-color: #6c757d;
    --waiting-color: #FFC107;
    --log-bg: #111122;
    --border-color: rgba(255, 255, 255, 0.1);
    --button-gradient: linear-gradient(90deg, #5D26C1 0%, #a170ff 100%); /* 登录按钮渐变 */
    --button-gradient-hover: linear-gradient(90deg, #4a1f9a 0%, #8c52ea 100%);
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100vh;
    display: flex; /* 让 body 作为 flex 容器 */
    flex-direction: column; /* 垂直布局 */
}

/* 页面容器，确保内容垂直居中 */
#root {
    flex-grow: 1; /* 让 root 占据可用空间 */
    display: flex;
    flex-direction: column;
}

.dashboard-page-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
}

.dashboard-title {
    font-size: 2em;
    font-weight: 700;
    color: #a1c4fd; /* 更亮的标题颜色 */
    margin: 0;
}

.client-uuid {
    font-size: 0.9em;
    opacity: 0.7;
}

.dashboard-main-content {
    flex-grow: 1;
    display: grid;
    grid-template-columns: 2fr 1fr; /* 左侧内容区 2/3, 右侧日志区 1/3 */
    gap: 20px;
}

/* 通用卡片样式 */
.card {
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px; /* 在网格布局中可以移除或调整 */
}

.card-header {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.8em;
    font-weight: 500;
    margin-left: 10px;
    color: white;
}

.status-ready { background-color: var(--success-color); }
.status-waiting { background-color: var(--waiting-color); color: #333; }
.status-idle { background-color: var(--idle-color); }
.status-telemetry { font-size: 0.8em; opacity: 0.8; }

/* 按钮样式 */
button, select, input[type="text"], input[type="date"], input[type="time"] {
    background-color: #333350;
    color: var(--text-color);
    border: 1px solid #555;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
}
button {
    background-color: var(--primary-color);
    border: none;
    padding: 10px 15px;
}
button:hover { background-color: #9273c5; }


/* 登录页面样式 */
.login-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url('https://user-images.githubusercontent.com/79626385/214945417-6ff5677d-71b3-4f90-8e1f-6a9c80529d2b.png'); /* 您的背景图 */
    background-size: cover;
    background-position: center;
}

.login-card {
    background-color: rgba(34, 34, 59, 0.9); /* 卡片背景带透明度 */
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
    text-align: center;
    width: 350px;
}

.login-card h2 {
    font-size: 1.8em;
    color: var(--text-color);
    margin-bottom: 10px;
}

.login-card p {
    font-size: 0.9em;
    opacity: 0.7;
    margin-bottom: 30px;
}

.login-input-group {
    margin-bottom: 20px;
    text-align: left;
}

.login-input-group label {
    display: block;
    font-size: 0.9em;
    margin-bottom: 8px;
    opacity: 0.8;
}

.login-input-group input {
    width: calc(100% - 24px); /* 减去 padding */
    padding: 12px;
    border: 1px solid #555;
    border-radius: 8px;
    background-color: #333350;
    color: var(--text-color);
    font-size: 1em;
}

.login-button {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 8px;
    background: var(--button-gradient);
    color: white;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}

.login-button:hover {
    background: var(--button-gradient-hover);
}