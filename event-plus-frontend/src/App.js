import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Notfound from "./Not_found";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}