import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
// import { Park_slot_view } from "./pages/components/homepage/homepage_components/Parkview/Park_slot_clicked";
import Park_slot_info from "./pages/components/homepage/homepage_components/Parkview/Park_slot_clicked";
function App() {
  return (
    <div className>
      <Routes>
        <Route index element={<Homepage/>}/>   
      </Routes>
    </div>
  );
}

export default App;
