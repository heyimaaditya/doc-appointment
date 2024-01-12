export const userSideMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house-chimney-medical",
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: "fa-solid fa-bars",
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Profile",
    path: "/profile",
    icon: "fa-solid fa-user",
  },
];

// Admin Sidemenu

export const adminSideMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house-chimney-medical",
  },

  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: "fa-solid fa-user-doctor",
  },

  {
    name: "Users",
    path: "/admin/users",
    icon: "fa-solid fa-user",
  },
  {
    name: "Profile",
    path: "/admin/profile/:id",
    icon: "fa-solid fa-user",
  },
];
export const doctorSideMenu = [
  {
    name: "Home",
    path: "/",
    icon: "fa-solid fa-house-chimney-medical",
  },
  {
    name: "Appointments",
    path: "/doctor-appointments",
    icon: "fa-solid fa-bars",
  },

  {
    name: "Profile",
    path: "/doctor/profile/:id",
    icon: "fa-solid fa-user",
  },
];