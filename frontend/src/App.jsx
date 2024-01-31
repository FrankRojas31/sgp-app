import { BrowserRouter, Route, Routes } from "react-router-dom";


import LoginPage from "./Pages/LoginPage";
import TeamsPage from "./Pages/TeamsPage";
import MembersPage from "./Pages/MembersPage"
import PagePropFirst from "./Components/projects/Page/FirstProjectProp";
import PagePropSecond from "./Components/projects/Page/SecondProject";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/members" element={<MembersPage/>} />
        <Route path="/teams" element={<TeamsPage/>} />
        <Route path="/PageFirstProject" element={<PagePropFirst/>} />
        <Route path="/PageSecondProject" element={<PagePropSecond/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;