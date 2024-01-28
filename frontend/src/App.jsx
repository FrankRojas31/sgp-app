import { BrowserRouter, Route, Routes } from "react-router-dom";


import LoginPage from "./Pages/LoginPage";
import Members from "./Pages/Members";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/members" element={<Members/>} />
      </Routes>
    </BrowserRouter>
  )
}
