import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import Homepage from "./Homepage";
import Notfound from "./Not_found";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import CreateEventForm from "./pages/CreateEvent";
import Event from "./pages/Event";
import UpdateEventForm from "./pages/UpdateEvent";
import LiveEvent from "./pages/LiveEvent";



// testing routes

export default function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<LiveEvent />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-event" element={<CreateEventForm />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/update-event/:id" element={<UpdateEventForm />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    <Footer />
    </>
  );
}



// OG routes (configure below)
/*
export default function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-event" element={<CreateEventForm />} />
      <Route path="/event/:id" element={<Event />} />
      <Route path="/update-event/:id" element={<UpdateEventForm />} />
      <Route path="/liveevent/:id" element={<LiveEvent />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    <Footer />
    </>
  );
}
*/
