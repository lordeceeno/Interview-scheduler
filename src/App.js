import { Routes, Route } from "react-router-dom";
import Apply from "./pages/apply";
import Interviewer from "./pages/interviewer";
import CreateInterviewer from "./pages/createInterviewer";
import "./App.css";
import "./scss/general.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/apply" element={<Apply />} />
        <Route path="/interviewer" element={<Interviewer />} />
        <Route path="/create-interviewer" element={<CreateInterviewer />} />
        <Route path="/" element={<Apply />} />
      </Routes>
    </div>
  );
}

export default App;
