import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/home_page/home_page.js"
import Feed from "./components/pages/feed/feed.js"
import EventPage from "./components/pages/event_page/event_page.js"
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/feed" element={<Feed/>}/>
          <Route exact path="/event-page" element={<EventPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
