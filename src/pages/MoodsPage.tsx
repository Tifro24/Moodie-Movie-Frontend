import { useNavigate } from "react-router-dom";




function MoodsPage(){

    const navigate = useNavigate();
    const moods = ["Happy", "Sad", "Adventurous", "Studious", "Funny", "Excited", "Scary"];

    return(
        <div className="moods-page page-container">
            <h1 className="fade-in-title">Select Your Mood</h1>
            <div className="moods-buttons fade-in-button">
                {moods.map((mood) => (
                    <button 
                    key={mood}
                    className="mood-button"
                    onClick={() => navigate(`/genres?mood=${mood.toLowerCase()}`)}
                    >
                        {mood}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodsPage;