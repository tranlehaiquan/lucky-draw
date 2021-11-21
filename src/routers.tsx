import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequiredLogin";
import Login from "./pages/Login";
import LuckyDraw from "./pages/LuckyDraw";
import Register from "./pages/Register";

function Routers() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/draw"
          element={
            <RequireAuth>
              <LuckyDraw />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Routers;
