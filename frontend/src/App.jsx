import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import api from "./api/axios.js";

function App() {
  const [msgbackend, setmsgbackend] = useState("");
  useEffect(() => {
    const testBackend = async () => {
      const response = await api.get("/api/test");
      setmsgbackend(response.data);
    };

    testBackend();

    return () => {};
  }, []);

  return (
    <>
      <div>{msgbackend.message}</div>
    </>
  );
  // return <AppRoutes />;
}

export default App;
