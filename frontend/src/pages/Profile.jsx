import api from "../api/axios.js";
import React from "react";
import { useState, useCallback } from "react";

const Profile = () => {
  const [data, setData] = useState("");

  useCallback(() => {
    const getProfile = async () => {
      const response = await api.get("/api/users/profile");
      setData(response.data);
    };

    getProfile();
    console.log(data);
    return () => {
      //Not needed here, but remainder to user it if needed later
    };
  }, []);
  return (
    <>
      <section className="flex justify-center items-center">
        <div className="text-2xl italic">testing</div>

        <div className="text-2xl italic">{data.greet}</div>
        <div className="text-2xl italic">{data.other}</div>
      </section>
    </>
  );
};

export default Profile;
