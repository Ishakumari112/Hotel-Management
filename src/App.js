import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Auth/SignIn";
import Forgot from "./Auth/Forgot";
import LayoutDashboard from "./Layout/LayoutDashboard";
import LayoutRooms from "./Layout/LayoutRooms";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/" element={<LayoutDashboard/>}/>
        <Route path="/room" element={<LayoutRooms/>}/>
        <Route path="/forgot-password" element={<Forgot />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
