import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import TeamsPage from "./Pages/TeamsPage.jsx";
import MembersPage from "./Pages/MembersPage.jsx";
import PagePropFirst from "./Components/projects/Page/FirstProjectProp.jsx";
import PagePropSecond from "./Components/projects/Page/SecondProject.jsx";
import HumanResource from "./Components/resources/Pages/HumanResource.jsx";
import MaterialResources from "./Components/resources/Pages/MaterialResource.jsx";
import PagePropThree from "./Components/projects/Page/Dashboard.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import ErrorPage from "./Pages/404.jsx";
import TeamsRead from "./Pages/ReadTeams.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notfound" element={<ErrorPage />} />
        <Route element={<PrivateRoute allowRoles={["admin"]} />}>
          <Route path="/members" element={<MembersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/PageFirstProject" element={<PagePropFirst />} />
          <Route path="/PageSecondProject" element={<PagePropSecond />} />
          <Route path="/PageSecondProject" element={<PagePropSecond />} />
          <Route path="/HumanResources" element={<HumanResource />} />
          <Route path="/MaterialResources" element={<MaterialResources />} />
          <Route path="/dashboard" element={<PagePropThree />} />
          
        </Route>
        <Route element={<PrivateRoute allowRoles={["member", "admin"]} />}>
          <Route path="/teamread" element={<TeamsRead />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
