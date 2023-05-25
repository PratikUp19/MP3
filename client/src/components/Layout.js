import React, { useState } from "react";
import "../Main.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Book a Container",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Logistic",
      path: "/apply-logistic",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: `/user/profile/${user?._id}`,
      icon: "ri-hospital-line",
    }
  ];


  const logisticMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Containers-Booked",
      path: "/logistic/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Approved Bookings",
      path: "/logistic/approved",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/logistic/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Logistics",
      path: "/admin/logisticslist",
      icon: "ri-user-star-line",
    },
    
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isLogistic
      ? logisticMenu
      : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isLogistic ? "Logistic" : "Trader";
  const n=user?.name;
  return (
    <div className="header">
      <nav className="navbar">
        <ul className="menu">
          <li className="menu-item">Hello {n}</li>
          {menuToBeRendered.map((item, index) => (
            <li key={index} className="menu-item">
              <a href={item.path} className="menu-link">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="logout">
          <div
            className={`d-flex menu-item `}
            onClick={() => {
              localStorage.clear();
              navigate("/dashboard");
            }}
          >
            <Link to="/dashboard">Logout</Link>
          </div>
        </div>
      </nav>
      <div className="body">{children}</div>
    </div>
  );
}

export default Layout;