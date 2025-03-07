import { useNavigate } from "react-router-dom";
import { useState } from "react";




function MoodsPage(){

    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    const moods = ["Happy", "Sad", "Adventurous", "Studious", "Funny", "Excited", "Scary"];
    const handleNavigation = (path: string) => {
        setFadeOut(true);
        setTimeout(() => {
            navigate(path);
        }, 1000)
    }


    return(
        <div className={`moods-page page-container ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="fade-in-title">Select Your Mood</h1>
            <div className="moods-buttons fade-in-button">
                {moods.map((mood) => (
                    <button 
                    key={mood}
                    className="mood-button"
                    onClick={() => handleNavigation(`/genres?mood=${mood.toLowerCase()}`)}
                    >
                        {mood}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodsPage;