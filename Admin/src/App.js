import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideBarLayout from "./pages/SideBar/SideBarLayout";
import StatsPage from "./pages/StatsPage/StatsPage.jsx";
import LoginPage from "./pages/LogInPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<SideBarLayout />}>
            <Route path="/stats" element={<StatsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
