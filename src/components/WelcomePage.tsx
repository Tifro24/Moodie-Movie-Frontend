
import { useSearchParams, useNavigate } from "react-router-dom";

function WelcomePage(){
    const [searchParams] = useSearchParams();
    const userName = searchParams.get("userName")
    const navigate = useNavigate();

    return(
        <div className="page-container">
            <h1 className="fade-in-title">Hi {userName}, here at Moodie Movie, we recommend movies based on your mood.</h1>
            <p className="fade-in-subtitle">How are you feeling? Or alternatively, you can use our search function to find a film</p>
            <button className="fade-in-button mood-button" onClick={() => navigate("/moods")}>Choose Mood</button>
            <button className="fade-in-button search-button" onClick={() => navigate("/search")}>Search Films</button>
        </div>
    );

};

export default WelcomePage;