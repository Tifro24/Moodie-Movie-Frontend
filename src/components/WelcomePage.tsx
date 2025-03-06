
import { useSearchParams, useNavigate } from "react-router-dom";

function WelcomePage(){
    const [searchParams] = useSearchParams();
    const userName = searchParams.get("userName")
    const navigate = useNavigate();

    return(
        <div>
            <h1>Hi {userName}, here at Moodie Movie, we recommend movies based on your mood.</h1>
            <p>How are you feeling? Or alternatively, you can use our search function to find a film</p>
            <button onClick={() => navigate("/moods")}>Choose Mood</button>
            <button onClick={() => navigate("/search")}>Search Films</button>
        </div>
    );

};

export default WelcomePage;