import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import OpenUrlButton from './OpenUrlButton'
import Header from './Header'
import GenreSelect from './GenreSelect';
import Films from './Films';

function App() {
 

  return (
    <>
    <Router>  
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/genres" element={<GenreSelect />} />
      <Route path="/films" element={<Films />} />     
    </Routes>
  </Router>
    </>
  )
}

export default App
