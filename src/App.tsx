import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import OpenUrlButton from './OpenUrlButton'
import Header from './Header'

function App() {
 

  return (
    <>
    <Router>  {/* Enables routing in the app */}
    <Routes> {/* Contains multiple routes */}
      <Route path="/" element={<Home />} />         {/* Home page */}
    </Routes>
  </Router>
    </>
  )
}

export default App
