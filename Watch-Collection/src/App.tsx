import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getItem } from "./lib/localStorage";
import { checkToken } from "./models";
import routes from "./router";
import { useUserZustand } from "./stores";

function App() {
  const setUser = useUserZustand((state) => state.setUser);

  useEffect(() => {
    const checkUser = () => {
      const token = getItem("token");
      if (token) {
        const user: checkToken = jwtDecode(token);
        console.log(user);
        setUser(user);
      }
    };
    checkUser();
  }, [setUser]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
