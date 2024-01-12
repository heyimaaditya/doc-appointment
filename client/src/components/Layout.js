import React from "react";
import "../styles/LayoutStyles.css";
import {
  adminSideMenu,
  doctorSideMenu,
  userSideMenu,
} from "../sideMenu/sideMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  //Logout Function

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  //Doctor sidemenu

  // const doctorSideMenu = [
  //   {
  //     name: "Home",
  //     path: "/",
  //     icon: "fa-solid fa-house-chimney-medical",
  //   },
  //   {
  //     name: "Appointments",
  //     path: "/doctor-appointments",
  //     icon: "fa-solid fa-bars",
  //   },

  //   {
  //     name: "Profile",
  //     path: `/doctor/profile/${user?._id}`,
  //     icon: "fa-solid fa-user",
  //   },
  // ];

  //rendering Sidemenu
  const SideMenu = user?.isAdmin
    ? adminSideMenu
    : user?.isDoctor
    ? doctorSideMenu
    : userSideMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Doctor App</h6>
              <hr />
            </div>
            <div className="menu">
              {SideMenu.map((menu, index) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={index}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}

              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>

                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <div className="userName">
                  {user?.isAdmin ? (
                    <Link to={`/admin/profile/${user?._id}`}>
                      {user?.name}{" "}
                    </Link>
                  ) : user?.isDoctor ? (
                    <Link to={`/doctor/profile/${user?._id}`}>
                      {user?.name}{" "}
                    </Link>
                  ) : (
                    <Link to={`/user/profile/${user?._id}`}>{user?.name} </Link>
                  )}
                  {/* <Link to={`/doctor/profile/${user?._id}`}>{user?.name} </Link> */}
                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;