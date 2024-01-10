import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.user);

  // to get user

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/v1/user/getUserData ",
          { token: localStorage.getItem("token") },
          {
            headers: {
              // must have one space after Bearer . read documentation
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (res.status === 200 && res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          <Navigate to="/login" />;
          localStorage.clear();
          console.error(res.data.message);
        }
      } catch (error) {
        localStorage.clear();
        console.log(error);
      }
    };

    if (localStorage.getItem("token")) {
      getUser();
    }
  }, [dispatch]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}