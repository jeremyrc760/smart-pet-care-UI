// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // 用于登录成功后的页面跳转
import './Login.css'; // 导入样式文件，实现目标界面的深色卡片和渐变按钮

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false); // 切换登录/注册模式
  const [isLoading, setIsLoading] = useState(false); // 加载状态，防止重复提交
  
  const navigate = useNavigate(); // 获取导航函数

  // 认证提交处理函数
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 动态决定调用哪个 API，保持与您后端定义的接口一致
    const endpoint = isRegister
      ? "http://localhost:5000/api/user/register"
      : "http://localhost:5000/api/user/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 如果响应状态码不是 2xx
        throw new Error(data.message || (isRegister ? "注册失败" : "登录失败"));
      }

      if (isRegister) {
        // 注册成功后，切换到登录界面并提示用户
        // 注意：这里使用 console.log 和 setError 代替 alert()，遵循最佳实践
        console.log("Registration successful! Please login.");
        setError("注册成功！请使用您的新账户登录。");
        setIsRegister(false);
      } else if (data.token) {
        // 登录成功
        localStorage.setItem("token", data.token);
        
        // 登录成功后，手动触发页面跳转到 Dashboard
        // 我们使用 window.location.href 强制刷新，让 App.jsx 重新加载并检测到 token，
        // 从而触发 PrivateRoute 的渲染。
        window.location.href = "/dashboard"; 
        
      } else {
        throw new Error("服务器未返回认证令牌。");
      }
    } catch (err) {
      console.error("Authentication Error:", err);
      // 显示用户友好的错误信息
      setError(err.message || (isRegister ? "注册请求失败" : "登录请求失败，请检查您的网络或后端服务。"));
    } finally {
      setIsLoading(false); // 无论成功失败，都停止加载
    }
  };
  
  // 切换模式时清理状态
  const handleToggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setUsername("");
    setPassword("");
  }

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>智能喂食器 {isRegister ? "账户注册" : "用户登录"}</h2>
        {/* 副标题，符合截图样式 */}
        <p className="subtitle">Group 7 control panel - PI feeder</p> 
        
        <form onSubmit={handleSubmit}>
          
          <div className="login-input-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="请输入用户名" 
              required
              disabled={isLoading}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              required
              disabled={isLoading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "处理中..." : (isRegister ? "注册账户" : "进入 Dashboard")}
          </button>

          <p style={{ marginTop: "20px", fontSize: "0.9em", opacity: "0.8" }}>
            {isRegister ? "已有账户？" : "没有账户？"}{" "}
            <span
              onClick={handleToggleMode}
              className="toggle-link"
            >
              {isRegister ? "立即登录" : "立即注册"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
