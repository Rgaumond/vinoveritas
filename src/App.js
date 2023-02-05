import "./App.css";
import Capture from "./components/CaptureWine/Capture";
import WineList from "./components/Lists/WineList";
// import UpdateWine from "./components/Update/UpdateWine";
import Cellar from "./components/Cellars/Cellar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const updateView = (id) => {
    window.location.href = "./edit/" + id;
  };
  return (
    <>
      <Router>
        {" "}
        <Routes>
          <Route path="/capture" element={<Capture />}></Route>
          <Route path="/cellar" element={<Cellar />}></Route>
          <Route path="/cellar/:wineid" element={<Cellar />}></Route>
          <Route path="/capture/:wineid" element={<Capture />}></Route>
          <Route
            path="/"
            element={<WineList updateView={updateView} />}
          ></Route>
          {/* <Route path="/edit/:id" element={<UpdateWine />}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
