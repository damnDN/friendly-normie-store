import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logOut } from "./redux/features/auth/authSlice.js";
import api from "./api/axios";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isHydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const refreshRes = await api.post("/api/v1/users/refresh");

        const { accessToken } = refreshRes.data;

        // Temporarily put token into Redux
        dispatch(
          setCredentials({
            user: null,
            accessToken,
          }),
        );

        const profileRes = await api.get("/api/v1/users/profile");

        dispatch(
          setCredentials({
            user: profileRes.data,
            accessToken,
          }),
        );
      } catch (err) {
        dispatch(logOut());
      }
    };

    checkExistingSession();
  }, [dispatch]);

  if (!isHydrated) {
    return <div>Loading your application session...</div>;
  }

  return <>{children}</>;
};

export default AppWrapper;
