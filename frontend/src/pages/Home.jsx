// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../api/axios.js";

export default function Home() {
  // const navigate = useNavigate();
  // const [msgbackend, setmsgbackend] = useState("");
  // useEffect(() => {
  //   const testBackend = async () => {
  //     const response = await api.get("/api/test");
  //     setmsgbackend(response.data);
  //   };

  //   testBackend();

  //   return () => {};
  // }, []);

  // return (
  //   <>
  //     <div>{msgbackend.message}</div>
  //   </>

  // );
  return (
    <div className="bg-purple-600 hover:bg-purple-500 text-white text-4xl text-center p-5">
      HOME BI
    </div>
  );
}
