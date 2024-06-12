import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/components/homepage/Homepage";
import LoginForm from "./pages/components/LoginForm/LoginForm";
import Signup_contents from "./pages/components/LoginForm/Signup_contents";
function App() {
  return (
    <div className>
      <Routes>
        <Route path="/" index element={<LoginForm/>}/>   
        <Route path="/ParkBuddy/:User_email" exact element={<Homepage/>}/>
        <Route path="/User_info/:User_email/:User_name" element={<Signup_contents/>}/>
      </Routes>
    </div>
  );
}

export default App;

