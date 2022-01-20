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
              <LuckyDraw key={1} totalShop={1} />
            </RequireAuth>
          }
        />
        <Route
          path="/draw4"
          element={
            <RequireAuth>
              <LuckyDraw key={4} totalShop={4} />
            </RequireAuth>
          }
        />
        <Route
          path="/draw8"
          element={
            <RequireAuth>
              <LuckyDraw key={8} totalShop={8} />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Routers;
