import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/home_page/home_page.js"
import Feed from "./components/pages/feed/feed.js"
import EventPage from "./components/pages/event_page/event_page.js"
import CreateEvent from "./components/pages/create_event/create_event.js"
import EditEvent from "./components/pages/edit_event/edit_event.js";
import ProfilePage from "./components/pages/profile_page/profile_page.js";
import EditProfile from "./components/pages/edit_profile/edit_profile.js";
import ChangePassword from "./components/pages/change_password/change_password.js";
import FeedbackForm from "./components/pages/feedback_form/feedback_form.js";
import Signin from "./components/pages/signin/signin.js";
import Signup from "./components/pages/signup/signup.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/feed" element={<Feed/>}/>
          <Route exact path="/event/:eventID" element={<EventPage/>}/>
          <Route exact path="/create-event" element={<CreateEvent/>}/>
          <Route exact path="/edit-event/:eventID" element={<EditEvent/>}/>
          <Route exact path="/profile" element={<ProfilePage/>}/>
          <Route exact path="/edit-profile" element={<EditProfile/>}/>
          <Route exact path="/change-password" element={<ChangePassword/>}/>
          <Route exact path="/feedback-form" element={<FeedbackForm/>}/>
          <Route exact path="/signin" element={<Signin/>}/>
          <Route exact path="/register" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
