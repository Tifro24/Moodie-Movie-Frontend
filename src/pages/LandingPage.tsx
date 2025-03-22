import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const colours = ["color1", "color2", "color3", "color4", "color5", "color6", "color7"];

function LandingPage() {
    
    const [letterClasses, setLetterClasses] = useState<string[]>(new Array(12).fill("default-colour"))
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");
    const [fadeOut, setFadeOut] = useState(false)
    const navigate = useNavigate();

    const handleLetterClick = (index: number) => {
        const randomClass = colours[Math.floor(Math.random() * colours.length)];
        setLetterClasses((prevClasses) => {
            const newClasses = [...prevClasses];
            newClasses[index] = randomClass;
            return newClasses
        })
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            navigate("/welcome"); //  Redirect if username exists
        }
    }, [navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName.trim()){
            setError("");
            setFadeOut(true)

            localStorage.setItem("userName", userName)

            setTimeout(() => {
                navigate(`/welcome?userName=${encodeURIComponent(userName)}`);
            }, 1000); 
        } else {
                setError("Please enter your name.")
        }
        
    };

    return(
        <div className= {`page-container landingPage ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="fade-in-title">{"Moodie Movie".split("").map((letter, index) => (
                <span
                key={index}
                className={`clickable-letter ${letterClasses[index]}`}
                onClick={() => handleLetterClick(index)}
                >
                    {letter}
                </span>
            ))}</h1>
            <form onSubmit={handleSubmit} className="fade-in-form">
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                 />
                 <button type="submit">Start</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
    
    
}

export default LandingPage
