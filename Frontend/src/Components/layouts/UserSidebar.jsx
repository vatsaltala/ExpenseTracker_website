
// import React, { useEffect, useState } from "react";
// import { UserNavbar } from "./UserNavbar";
// import { Link, Outlet } from "react-router-dom";
// import axios from "axios";

// export const UserSidebar = () => {
//   const [name, setName] = useState({ firstname: "", lastname: "" });
//   const userId = localStorage.getItem("id"); // Make sure this matches your actual localStorage key

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Make sure the API endpoint is correct and includes the user ID
//         const response = await axios.get(`http://localhost:3000/user/getuser/${userId}`);
//         console.log(response)
//         // console.log("API Response:", response.data); 
        
//         // Check the response structure and adjust accordingly
//         if (response.data && response.data.data.firstname) {
//           setName({
//             firstname: response.data.data.firstname,
//             lastname: response.data.data.lastname || "hi"
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     } else {
//       console.log("No user ID found in localStorage");
//     }
//   }, [userId]);

//   return (
//     <>
//       <UserNavbar></UserNavbar>
//       <aside
//         className="app-sidebar bg-body-secondary shadow"
//         data-bs-theme="dark"
//       >
//         <div className="sidebar-brand">
//           <Link to="/user/info" className="brand-link">

//             <span className="brand-text fw-light">
//               {name.firstname+" "+name.lastname || "Welcome"}
//             </span>
//           </Link>
//         </div>
//         <div
//           className=""
//           data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
//           tabIndex={-1}
//           style={{
//             marginRight: "-16px",
//             marginBottom: "-16px",
//             marginLeft: 0,
//             top: "-8px",
//             right: "auto",
//             left: "-8px",
//             width: "calc(100% + 16px)",
//             padding: 8
//           }}
//         >
//           <nav className="mt-2">
//             <ul
//               className="nav sidebar-menu flex-column"
//               data-lte-toggle="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               <li className="nav-item menu-open">
//                 <Link to="/user/profile" className="nav-link active">
//                   <i className="nav-icon bi bi-speedometer" />
//                   <p>
//                     user profile
//                     <i className="nav-arrow bi bi-chevron-right" />
//                   </p>
//                 </Link>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <Link to="/user/income" className="nav-link active">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>add income</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/user/AddExpense" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>add expense</p>
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/user/AllExpense" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Total Balance</p>
//                     </Link>
//                   </li>
//                   {/* <li className="nav-item">
//                     <Link to="/user/chart" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>chart</p>
//                     </Link>
//                   </li> */}
//                 </ul>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>
//       <main className="app-main">
//         <Outlet></Outlet>
//       </main>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

export const UserSidebar = () => {
  const [profile, setProfile] = useState({ name: "", profilepic: "" });
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/upload");
        if (res.data?.data?.length > 0) {
          // Assuming the first item is the logged-in user's profile
          const userProfile = res.data.data[0];
          setProfile({
            name: userProfile.name || "Welcome",
            profilepic: userProfile.profilepic || "",
          });
        } else {
          setProfile({ name: "Welcome", profilepic: "" });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setProfile({ name: "Welcome", profilepic: "" });
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <UserNavbar />
      <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <Link to="/user/info" className="brand-link" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {profile.profilepic && (
              <img
                src={profile.profilepic}
                alt={profile.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <span className="brand-text fw-light">{profile.name}</span>
          </Link>
        </div>

        {/* Rest of your sidebar code */}
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
                <Link to="/user/profile" className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    user profile
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/user/income" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>add income</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user/AddExpense" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>add expense</p>
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
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};
