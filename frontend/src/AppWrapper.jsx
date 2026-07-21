import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCredentials,
  setHydrated,
} from "./redux/features/auth/authSlice.js";
import api from "./api/axios";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isHydrated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // Hit refresh endpoint on load. If cookie is valid, backend hands us a new AT.
        const res = await api.post("/api/v1/users/refresh");

        // Fetch user data using your new active token session
        const profileRes = await api.get("/api/v1/users/profile");

        dispatch(
          setCredentials({
            user: profileRes.data,
            accessToken: res.data.accessToken,
          }),
        );
      } catch (err) {
        // No valid token/cookie found, user is safely treated as guest
        dispatch(setHydrated());
      }
    };

    checkExistingSession();
  }, [dispatch]);

  // Block rendering until the background authentication handshake finishes
  if (!isHydrated) {
    return <div>Loading your application session...</div>;
  }

  return <>{children}</>;
};

export default AppWrapper;
