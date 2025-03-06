
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import GenreSelectPage from './components/GenreSelectPage';
import Films from './Films';
import LandingPage from './components/LandingPage';
import WelcomePage from "./components/WelcomePage";
import MoodsPage from "./components/MoodsPage";
import SearchFilmsPage from "./components/SearchFilmsPage";

function App() {
 

  return (
    <>
    <div className="app-background"><Router>  
    <Routes> 
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/moods" element={<MoodsPage />} />
      <Route path="/genres" element={<GenreSelectPage />} />
      <Route path="/films" element={<Films />} />
      <Route path="/search" element={<SearchFilmsPage />} />     
    </Routes>
  </Router></div>
    
    </>
  )
}

export default App
