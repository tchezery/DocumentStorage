import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import WhyUs from './pages/WhyUs'
import Transparency from './pages/Transparency'
import FloatingUploadButton from './components/FloatingUploadButton'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/porque-somos-melhor" element={<WhyUs />} />
        <Route path="/transparencia" element={<Transparency />} />
      </Routes>
      <FloatingUploadButton />
    </Router>
  )
}

export default App

