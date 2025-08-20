import React from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Import hook

export const UserSidebar = () => {
  const { profile } = useUser(); // Live profile data from context

  return (
    <>
      <UserNavbar />
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        {/* Brand section with profile image + name */}
        <div className="sidebar-brand">
          <Link
            to="/user/info"
            className="brand-link"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img
              src={profile?.profilepic || "/default-avatar.png"}
              alt={profile?.name || "User"}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span className="brand-text fw-light">
              {profile?.name || "Guest"}
            </span>
          </Link>
        </div>

        {/* Sidebar menu */}
        <nav className="mt-2">
          <ul
            className="nav sidebar-menu flex-column"
            data-lte-toggle="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="/user/profile" className="nav-link active">
                <i className="nav-icon bi bi-speedometer" />
                <p>
                  User Profile
                  <i className="nav-arrow bi bi-chevron-right" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/user/income" className="nav-link active">
                    <i className="nav-icon bi bi-circle" />
                    <p>Add Income</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/AddExpense" className="nav-link">
                    <i className="nav-icon bi bi-circle" />
                    <p>Add Expense</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/AllExpense" className="nav-link">
                    <i className="nav-icon bi bi-circle" />
                    <p>Total Balance</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};
