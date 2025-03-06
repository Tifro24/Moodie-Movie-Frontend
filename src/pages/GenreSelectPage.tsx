import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GenreSelectPage(){
    const [genres, setGenres]  = useState<string[]>([])
    const [searchParams]  = useSearchParams();
    const mood = searchParams.get("mood");
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`http://localhost:8080/preferences/byMood?mood=${mood}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched data:", data)
            setGenres(data.map((category:any) => category.category))
        })
        .catch(error => console.error("Error fetching genres:", error))
    }, [mood]);
    
    return (
        <div className="genre-select-page">
            <h1> We recommend these genres based on your chosen mood: {`(${mood})`}</h1>
            <div className="genre-buttons">
                    {genres.map((genre) => (
                        <button className="genre-button" key={genre} onClick={() => navigate(`/films?genre=${genre}`)}> 
                        {genre}
                        </button>
                    ))}
            </div>
            <button className="back-button" onClick={() => navigate("/moods")}>Go back</button>
        </div>
    )
}

export default GenreSelectPage;