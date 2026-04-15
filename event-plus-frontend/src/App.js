import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./Homepage";
import Notfound from "./Not_found";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import CreateEventForm from "./pages/CreateEvent";
import Event from "./pages/Event";
import UpdateEventForm from "./pages/UpdateEvent";
import JoinRoom from "./pages/Room";
import JoinRoomLink from "./pages/JoinRoom";
import "./index.css";
export default function App() {
  return (
    <>
    <Header />
    <ToastContainer position="top-right" autoClose={5000} pauseOnHover />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-event" element={<CreateEventForm />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/update-event/:id" element={<UpdateEventForm />} />
      <Route path="/room/:room_id" element={<JoinRoom />} />
      <Route path="/join-a-room" element={<JoinRoomLink />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    <Footer />
    </>
  );
}