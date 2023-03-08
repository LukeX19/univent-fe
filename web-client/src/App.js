import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/home_page/home_page.js"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
