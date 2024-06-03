import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <div className>
      <Routes>
        <Route index  element={<Homepage/>}/>   
      </Routes>
    </div>
  );
}

export default App;
