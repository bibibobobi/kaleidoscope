import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Kaleidoscope from "./components/Kaleidoscope";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Kaleidoscope />} />
      </Routes>
    </Router>
  );
}

export default App;
