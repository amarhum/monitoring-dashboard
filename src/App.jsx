import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "./layout/MainLayout"

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Analytics from "./pages/Analytics"
import Settings from "./pages/Settings"
import Api from "./pages/ApiProjects"
import ProjectApis from "./pages/ProjectApis"
import Alerts from "./pages/Alerts"
import ProjectDetail from "./pages/ProjectDetail"


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainLayout/>}>

          <Route index element={<Dashboard/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="projects" element={<Projects/>}/>
          <Route path="api" element={<Api/>}/>
          <Route path="/apis/:projectId" element={<ProjectApis />} />
          <Route path="alerts" element={<Alerts/>}/>
          <Route path="analytics" element={<Analytics/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App