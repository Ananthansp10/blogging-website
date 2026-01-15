import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import WelcomePage from "./pages/WelcomePage"
import DashboardPage from "./pages/DashboardPage"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage/>}/>
          <Route path="/register" element={<SignupPage/>}/>
          <Route path="/login" element={<SigninPage/>}/>
          <Route path="/dashboard" element={<DashboardPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
