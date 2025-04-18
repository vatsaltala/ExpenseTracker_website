import React, { useEffect, useState } from "react";
import { AdminNavbar } from "./AdminNavbar";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export const AdminSidebar = () => {
  const [userdata, setUserdata] = useState({ firstname: "", lastname: "" });
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const userid = localStorage.getItem("id");
        if (userid) {
          const userres = await axios.get(`http://localhost:3000/user/getuser/${userid}`);
          console.log(userres.data);
          setUserdata({
            firstname: userres.data.data.firstname,
            lastname: userres.data.data.lastname,
          });
        }
      } catch (err) {
        console.error("Error fetching admin details:", err);
      }
    };

    fetchAdminDetails(); // Call the function
  }, []); 
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <Link to="./index.html" className="brand-link">
            <span className="brand-text fw-light">{userdata.firstname} {userdata.lastname}</span>
          </Link>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8
          }}
        >
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
                    Admin profile
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/admin/addcategory" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>add Expense_category</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/addincomecategory" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>add Income_category</p>
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/admin/chart1" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>chart</p>
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/admin/userdetails" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>user details</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin/issues" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>issues</p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};