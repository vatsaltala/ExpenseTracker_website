import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

export const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    const obj = { password: data.password, token };
    try {
      await axios.post("http://localhost:3000/user/resetpassword", obj);
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <section className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">🔐 Reset Password</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Enter your new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="reset-btn">Reset Password</button>
        </form>

        <div className="reset-link">
          Remembered your password? <a href="/login">Login</a>
        </div>
      </div>
    </section>
  );
};
