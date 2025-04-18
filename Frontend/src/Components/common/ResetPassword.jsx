import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css"

export const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { token } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    const obj = {
      password: data.password,
      token: token,
    };

    try {
      const res = await axios.post("http://localhost:3000/user/resetpassword", obj);
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">🔐 Reset Password</h2>
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

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Reset Password
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <p className="small">
                    Remembered your password?{" "}
                    <a href="/login" className="text-decoration-none">Login</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
