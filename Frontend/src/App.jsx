import { Route, Routes } from "react-router-dom";
import "./assets/adminlte.min.css";

import { UserSidebar } from "./Components/layouts/UserSidebar";
import { Signup } from "./Components/common/Signup";
import AddExpense from "./Components/user/AddExpense";
import Income from "./Components/user/AddIncome";
import History from "./Components/user/History";
import PrivateRoutes from "./Components/hooks/PrivateRoutes";
import AddCategory from "./Components/admin/AddCategory";
import { AdminSidebar } from "./Components/admin/AdminSidebar";
import UserDetail from "./Components/admin/UserDetail";
import UserCalculation from "./Components/admin/UserCalculation";
import Chart from "./Components/user/chart";
import { Userchart } from "./Components/admin/Userchart";
import AddIncomeCategory from "./Components/admin/AddIncomeCategory";
import AdminProfile from "./Components/admin/AdminProfile";
import Chart1 from "./Components/admin/AdminChart";
import { ResetPassword } from "./Components/common/ResetPassword";
import LandingPage from "./Components/common/LandingPage";
import About from "./Components/common/About";
import ContactUs from "./Components/common/ContactUs";
import Login from "./Components/common/Login";
import { Issue } from "./Components/admin/Issue";
import { Userinfo } from "./Components/layouts/Userinfo";
import UserProfile from "./Components/user/UserProfile";
import { UserRoutes } from "./Components/hooks/UserRoutes";
import { AdminRoutes } from "./Components/hooks/AdminRoutes";

function App() {
  return (
    <div className="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div className="app-wrapper">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          

          {/* Protected routes */}
          <Route element={<PrivateRoutes />}>
            {/* User routes */}
            <Route element={<UserRoutes/>}>
            <Route path="/user" element={<UserSidebar />}>
              <Route path="contact" element={<ContactUs />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="AddExpense" element={<AddExpense />} />
              <Route path="income" element={<Income />} />
              <Route path="AllExpense" element={<History />} />
              <Route path="chart" element={<Chart />} />
              <Route path="info" element={<Userinfo />} /> 
            </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<AdminRoutes/>}>
            <Route path="/admin" element={<AdminSidebar />}>
              <Route path="addcategory" element={<AddCategory />} />
              <Route path="addincomecategory" element={<AddIncomeCategory />} />
              <Route path="userdetails" element={<UserDetail />} />
              <Route path="calculation/:userId" element={<UserCalculation />} />
              <Route path="chart1" element={<Chart1 />} />
              <Route path="userchart/user/:userid" element={<Userchart />} />
              <Route path="adminprofile" element={<AdminProfile />} />
              <Route path="issues" element={<Issue />} />
              <Route path="info" element={<Userinfo />} />
            </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
