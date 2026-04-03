import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import SignIn from "./pages/Sign_in";
import SignUp from "./pages/Sign_up";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}