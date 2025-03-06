
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function WelcomePage(){
    const [searchParams] = useSearchParams();
    const userName = searchParams.get("userName")
    const navigate = useNavigate();
    const [moodText, setMoodText] = useState("");
    const [searchText, setSearchText] = useState("");


    return(
        <div className="welcome-page page-container">
            <h1 className="fade-in-title welcome-title">Hi {userName}! Here at Moodie Movie, we recommend movies based on your mood.</h1>
            <p className="fade-in-subtitle">How are you feeling? Or alternatively, you can use our search function to find a film.</p>
            
            <div className="button-container">
                
                <div className="button-wrapper">
                    
                    <button className="fade-in-button mood-button" 
                        onClick={() => navigate("/moods")}
                        onMouseEnter={() => setMoodText("'Your mood is a canvas, paint it with the colours of your choosing'")}
                        onMouseLeave={() => setMoodText("")}
                        >Choose Mood
                    </button>
                    <p className="hover-text">{moodText}</p>
                </div>
                

                <div className="button-wrapper">
                        
                    <button className="fade-in-button search-button" 
                        onClick={() => navigate("/search")}
                        onMouseEnter={() => setSearchText("Err..kinda boring don't you think?")}
                        onMouseLeave={() => setSearchText("")}
                    >Search Films
                    </button>
                    <p className="hover-text">{searchText}</p>
                </div>
                
            </div>
            
        </div>
    );

};

export default WelcomePage;