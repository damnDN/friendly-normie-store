import api from "../api/axios.js";
import { React, useState, useEffect } from "react";
import { logOut } from "../redux/features/auth/authSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ data: "", greet: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      const response = await api.get("/api/v1/users/logout");
      const data = response.data;

      // Dispatch data right into Redux state memory
      dispatch(logOut());
    } catch (error) {
      console.log(error);
      const data = error.response?.data;
      setErrors(
        data?.errors ?? {
          general: data?.message ?? "An error occurred",
        },
      );
      console.log(data);
    } finally {
      setLoading(false);
      navigate("/login");
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="text-2xl italic font-semibold">testing</div>

        <div className="text-2xl italic">{data.greet}</div>
        <div className="text-2xl italic">{data.other}</div>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="px-8 py-2 bg-pink-400 hover:bg-pink-300 text-white rounded-xl"
        >
          {loading ? "Signing out..." : "Sign out"}
        </button>
        {errors.general && (
          <p className="mt-1 text-sm text-red-400">{errors.general}</p>
        )}
      </section>
    </>
  );
};

export default Profile;
