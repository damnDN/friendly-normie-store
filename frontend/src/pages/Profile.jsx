import api from "../api/axios.js";
import { React, useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState({ data: "", greet: "" });
  useEffect(() => {
    const getProfile = async () => {
      const response = await api.get("/api/v1/users/profile");
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
      <section className="flex flex-col justify-center items-center">
        <div className="text-2xl italic">testing</div>

        <div className="text-2xl italic">{data.greet}</div>
        <div className="text-2xl italic">{data.other}</div>
      </section>
    </>
  );
};

export default Profile;
