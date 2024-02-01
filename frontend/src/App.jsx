import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import TeamsPage from "./Pages/TeamsPage";
import MembersPage from "./Pages/MembersPage";
import PagePropFirst from "./Components/projects/Page/FirstProjectProp";
import PagePropSecond from "./Components/projects/Page/SecondProject";
import HumanResource from "./Components/resources/Pages/HumanResource";
import MaterialResources from "./Components/resources/Pages/MaterialResource";
import PagePropThree from "./Components/projects/Page/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/members" element={<MembersPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/PageFirstProject" element={<PagePropFirst />} />
          <Route path="/PageSecondProject" element={<PagePropSecond />} />
          <Route path="/PageSecondProject" element={<PagePropSecond />} />
          <Route path="/HumanResources" element={<HumanResource />} />
          <Route path="/MaterialResources" element={<MaterialResources />} />
          <Route path="/dashboard" element={<PagePropThree />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
