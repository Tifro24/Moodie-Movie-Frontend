
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage(){
    const [userName, setUserName] = useState("")
    const navigate = useNavigate();
    const [moodText, setMoodText] = useState("");
    const [searchText, setSearchText] = useState("");
    const [fadeOut, setFadeOut] = useState(false);
    

    const handleNavigation = (path: string) => {
        setFadeOut(true);
        setTimeout(() => {
            navigate(path);
        }, 500)
    }

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if(storedName){
            setUserName(storedName);
        }
    }, [])


    return(
        <div className={`welcome-page page-container ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="fade-in-title welcome-title">Hi {userName}! Here at Moodie Movie, we recommend movies based on your mood.</h1>
            <p className="fade-in-subtitle">How are you feeling? Or alternatively, you can use our search function to find a film.</p>
            
            <div className="button-container">
                
                <div className="button-wrapper">
                    
                    <button className="fade-in-button mood-button" 
                        onClick={() => handleNavigation("/moods")}
                        onMouseEnter={() => setMoodText("'Your mood is a canvas, paint it with the colours of your choosing'")}
                        onMouseLeave={() => setMoodText("")}
                        >Choose Mood
                    </button>
                    <p className="hover-text">{moodText}</p>
                </div>
                

                <div className="button-wrapper">
                        
                    <button className="fade-in-button search-button" 
                        onClick={() => handleNavigation("/search")}
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