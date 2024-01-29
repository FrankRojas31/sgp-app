import { BrowserRouter, Route, Routes } from "react-router-dom";


import LoginPage from "./Pages/LoginPage";
import TeamsPage from "./Pages/TeamsPage";
import MembersPage from "./Pages/MembersPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/members" element={<MembersPage/>} />
        <Route path="/teams" element={<TeamsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;