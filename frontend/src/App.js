import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authpage from "./Pages/Authpage";
import Homepage from "./Pages/Homepage";
import { getUserPlans } from "./Redux/plansReducer";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      dispatch(getUserPlans());
    }
  }, [dispatch, user]);
  return (
    <Routes>
      <Route path="/" element={<Authpage />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
}

export default App;
