import React, { useState } from "react";
import "../layout.css";
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
  name:"Profile",
  path:`/user/profile/${user?._id}`,
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
    {
      name: "Search Patient",
      path: "/search-patient",
      icon: "ri-search-line",
    },
    {
      name: "Register Patient",
      path: "/register-patient",
      icon: "ri-user-add-line",
    },

    {
      name: "Billing",
      path: "/billing",
      icon: "ri-money-dollar-circle-line",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "ri-file-chart-line",
    },
    {
      name: "Laboratory",
      path: "/laboratory",
      icon: "ri-flask-line",
    },

    {
      name: "Inventory",
      path: "/inventory",
      icon: "ri-archive-line",
    },
    {
      name: "Accounting",
      path: "/accounting",
      icon: "ri-bank-line",
    },

    {
      name: "Maternity",
      path: "/maternity",
      icon: "ri-women-line",
    },
    {
      name: "Helpdesk",
      path: "/helpdesk",
      icon: "ri-questionnaire-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isLogistic
    ? logisticMenu
    : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isLogistic ? "Logistic" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">Couriers</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                  key={menu.name}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
