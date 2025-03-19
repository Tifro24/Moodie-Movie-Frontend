import { useLocation, useNavigate } from "react-router-dom";

function WatchlistButton(){
    const navigate = useNavigate();
    const location = useLocation();

    // Hide button on landing page
    if (location.pathname === "/") return null;

    if(location.pathname === "/watchlist") return null

    return (
        <button
            onClick={() => navigate("/watchlist")}
            className="watchlist-btn"
        >
            View Watchlist 
        </button>
      );
 };  

 export default WatchlistButton;