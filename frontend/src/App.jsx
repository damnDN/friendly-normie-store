// import { useEffect, useState } from "react";
// import api from "./api/axios.js";

import AppRoutes from "./routes/AppRoutes";
import AppWrapper from "./AppWrapper.jsx";

function App() {
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  );
}

export default App;

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
