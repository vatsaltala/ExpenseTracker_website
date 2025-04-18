import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserNavbar.css";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({ firstname: "", lastname: "" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userid = localStorage.getItem("id");
        if (userid) {
          const userres = await axios.get(`http://localhost:3000/user/getuser/${userid}`);
          setUserdata({
            firstname: userres.data.data.firstname,
            lastname: userres.data.data.lastname,
          });
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    transition: "none",
    boxShadow: "none",
    background: "transparent"
  };

  return (
    <nav className="app-header navbar navbar-expand bg-body">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="#" role="button" style={linkStyle}>
              <i className="bi bi-list" />
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/user/profile" className="nav-link" style={linkStyle}>
              Home
            </Link>
          </li>
          <li className="nav-item d-none d-md-block">
            <Link to="/Contactus" className="nav-link" style={linkStyle}>
              Contact
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto">
          <li className="nav-item d-flex align-items-center">
            <span className="me-3 fw-bold">
              {userdata.firstname} {userdata.lastname}
            </span>
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
              style={{ boxShadow: "none", transition: "none" }}
            >
              <i className="bi bi-box-arrow-right"></i>
              <span className="ms-2">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
