import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GenreSelectPage(){
    const [genres, setGenres]  = useState<string[]>([])
    const [searchParams]  = useSearchParams();
    const mood = searchParams.get("mood");
    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);
    const handleNavigation = (path: string) => {
        setFadeOut(true);
        setTimeout(() => {
            navigate(path);
        }, 1000)
    }


    useEffect(() => {
        fetch(`http://localhost:8080/preferences/byMood?mood=${mood}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched data:", data)
            setGenres(data.map((category:any) => category.category))
        })
        .catch(error => console.error("Error fetching genres:", error))
    }, [mood, navigate]);
    
    return (
        <div className={`genre-select-page page-container ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="fade-in-title"> We recommend these genres based on your chosen mood!</h1>
            <div className="genre-buttons fade-in-button">
                    {genres.map((genre) => (
                        <button className="genre-button" key={genre} onClick={() => handleNavigation(`/films?genre=${genre}`)}> 
                        {genre}
                        </button>
                    ))}
                        <button className="back-button fade-in-button" onClick={() => handleNavigation("/moods")}>Go back</button>
            </div>
            
        </div>
    )
}

export default GenreSelectPage;