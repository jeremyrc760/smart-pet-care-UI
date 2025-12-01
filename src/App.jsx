// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Layout from "./components/Layout.jsx"; // 导入 Layout 组件，用于包裹 Dashboard

// ====================================================================
// 认证状态上下文 (方便在任何组件中访问/修改 token) - 推荐做法
// ====================================================================
const AuthContext = React.createContext(null);

// ====================================================================
// 认证状态提供者 (Provider)
// ====================================================================
function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. 启动时检查本地存储
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
        setLoading(false);
    }, []);

    // 2. 登录函数 (供 Login.jsx 调用)
    const handleLoginSuccess = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // 3. 登出函数 (供 Dashboard 或 Header 登出按钮调用)
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        // 如果需要，可以在这里调用 API 清除后端 session
    };
    
    // 如果正在加载，可以显示加载状态
    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e', color: '#fff' }}>Loading...</div>;
    }

    const value = { token, handleLoginSuccess, handleLogout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// ====================================================================
// 私有路由组件 (Protected Route)
// ====================================================================
// 确保只有认证用户才能访问 Dashboard 路径
function PrivateRoute({ children }) {
    const { token } = React.useContext(AuthContext);

    // 如果没有 token，强制跳转到登录页 ( / )
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}


// ====================================================================
// 主应用组件 (App)
// ====================================================================
function App() {
    return (
        <Router>
            <AuthProvider> {/* 所有路由都被 AuthProvider 包裹 */}
                <Routes>
                    
                    {/* 1. 登录路由：如果用户已登录，则强制跳转到 /dashboard */}
                    <Route 
                        path="/" 
                        element={
                            <AuthRequiredRedirect>
                                <Login />
                            </AuthRequiredRedirect>
                        } 
                    />
                    
                    {/* 2. Dashboard 路由：受 PrivateRoute 保护 */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Layout> {/* 使用 Layout 包装 Dashboard 以提供头部/背景 */}
                                    <Dashboard />
                                </Layout>
                            </PrivateRoute>
                        }
                    />
                    
                    {/* 404 页面或重定向 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                    
                </Routes>
            </AuthProvider>
        </Router>
    );
}

// 认证后重定向组件：如果用户已登录 (有 token)，则强制跳转到 Dashboard
function AuthRequiredRedirect({ children }) {
    const { token } = React.useContext(AuthContext);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }
    
    // 否则显示子组件 (Login 页面)
    return children;
}


export default App;
// 提示：现在您可以在任何组件中使用 'const { handleLogout } = React.useContext(AuthContext);' 来登出。