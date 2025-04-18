import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const roleId = data.role === "user" ? "67fcecd38ceacc2475831eff" : "67fcecc98ceacc2475831efd";
      const res = await axios.post("http://localhost:3000/user/signup", {
        ...data,
        roleId: roleId
      });

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during signup.");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-fullscreen-container">
      <div className="signup-left">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
          alt="Signup"
          className="signup-full-img"
        />
      </div>
      <div className="signup-right d-flex align-items-center justify-content-center">
        <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
          <h2 className="text-center mb-4">Create Account</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-outline mb-4">
              <input
                type="text"
                placeholder="First Name"
                className={`form-control ${errors.firstname && "is-invalid"}`}
                {...register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters required"
                  }
                })}
              />
              {errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div>}
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                placeholder="Last Name"
                className={`form-control ${errors.lastname && "is-invalid"}`}
                {...register("lastname", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters required"
                  }
                })}
              />
              {errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div>}
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                placeholder="Email"
                className={`form-control ${errors.email && "is-invalid"}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                placeholder="Password"
                className={`form-control ${errors.password && "is-invalid"}`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required"
                  }
                })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            <button type="submit" className="btn btn-signup w-100 mb-3">Register</button>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="login-link">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
