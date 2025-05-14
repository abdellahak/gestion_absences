import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Home/login/Login";
import { AuthWrapper } from "./assets/wrapper/AuthWrapper";
import Loading from "./assets/loading/Loading";
import DashboardRouter from "./components/dashboard/DashboardRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
