import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/user/loginwithtoken", data);
      const user = res.data.data;
      const token = res.data.token;

      localStorage.setItem("id", user._id);
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", token);

      if (user.role === "user") {
        navigate("/user/profile");
      } else if (user.role === "admin") {
        navigate("/admin");
      }

      alert("Login success");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-fullscreen-container">
      <div className="login-left">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
          alt="login"
          className="login-full-img"
        />
      </div>
      <div className="login-right d-flex align-items-center justify-content-center">
        <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="text-center mb-4">
              <h1 className="fw-bold">Login</h1>
              <p className="text-muted">Sign into your account</p>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>

            <button className="btn btn-dark w-100 mb-3" type="submit">
              Login
            </button>

            <div className="d-flex justify-content-between">
              <Link to="/resetpassword" className="small text-muted">Forgot password?</Link>
              <Link to="/signup" className="small text-muted">Sign up</Link>
            </div>

            <div className="mt-3 text-center">
              <Link to="#" className="small text-muted">Terms of use</Link> &nbsp;|&nbsp;
              <Link to="#" className="small text-muted">Privacy policy</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
