// src/components/AdminSidebar.jsx
import React from "react";
import { AdminNavbar } from "./AdminNavbar";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // use shared context

export const AdminSidebar = () => {
  const { profile } = useUser();

  return (
    <>
      <AdminNavbar />

      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
        style={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "auto"
        }}
      >
        <div className="sidebar-brand d-flex align-items-center p-3">
          {/* Profile Picture */}
          <Link to="/admin/info" className="brand-link d-flex align-items-center">
            <img
              src={
                profile?.profilepic
                  ? profile.profilepic
                  : "https://via.placeholder.com/50"
              }
              alt="Admin"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px"
              }}
            />
            {/* Name */}
            <span className="brand-text fw-light">
              {profile?.name || "Admin"}
            </span>
          </Link>
        </div>

        <nav className="mt-2">
          <ul
            className="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="/admin/adminprofile" className="nav-link active">
                <i className="nav-icon bi bi-speedometer" />
                <p>
                  Admin Profile
                  <i className="nav-arrow bi bi-chevron-right" />
                </p>
              </Link>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/admin/addcategory" className="nav-link active">
                    <i className="nav-icon bi bi-circle" />
                    <p>Add Expense Category</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/addincomecategory" className="nav-link active">
                    <i className="nav-icon bi bi-circle" />
                    <p>Add Income Category</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/userdetails" className="nav-link">
                    <i className="nav-icon bi bi-circle" />
                    <p>User Details</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/issues" className="nav-link">
                    <i className="nav-icon bi bi-circle" />
                    <p>Issues</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="app-main" style={{ marginLeft: "250px" }}>
        <Outlet />
      </main>
    </>
  );
};
