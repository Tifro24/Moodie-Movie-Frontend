
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenreSelectPage from './pages/GenreSelectPage';
import Films from './pages/Films';
import LandingPage from './pages/LandingPage';
import WelcomePage from "./pages/WelcomePage";
import MoodsPage from "./pages/MoodsPage";
import SearchFilmsPage from "./pages/SearchFilmsPage";

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
