import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../global";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    axios
      .post(`${SERVER_URL}/user/login`, { username, password })
      .then((response) => {
        const { username } = response.data;
        console.log("Username:", username);

        // تخزين البيانات في Local Storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.username);

        // عرض رسالة نجاح
        enqueueSnackbar("Login Successfully", { variant: "success" });

        // الانتقال إلى الصفحة الرئيسية
        navigate("/home", { state: { username } });
      })
      .catch((error) => {
        // عرض رسالة خطأ
        enqueueSnackbar("Login failed", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Login</h1>
      <div className="p-4">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleLogin}>
          Login
        </button>
        <div className="mt-3">
          <p className="mx-4">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
