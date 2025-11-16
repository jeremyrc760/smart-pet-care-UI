import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 动态决定调用哪个 API
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
        throw new Error(data.message || (isRegister ? "Register failed" : "Login failed"));
      }

      if (isRegister) {
        alert(" Registration successful! Please login.");
        setIsRegister(false);
      } else if (data.token) {
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.token);
      } else {
        throw new Error("No token received from the server");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Smart Feeder {isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>

        <p style={{ marginTop: "10px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            {isRegister ? "Login here" : "Register here"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
