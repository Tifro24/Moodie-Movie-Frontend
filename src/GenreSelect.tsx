import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function GenreSelect(){
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
    }, [mood]);
    
    return (
        <div>
            <h1> We recommend these genres based on your mood: {mood}</h1>
            
            {genres.map((genre) => (
                <button key={genre} onClick={() => navigate(`/films?byMood?mood=${genre}`)}> {genre}</button>
            ))}
            <button onClick={() => navigate("/")}>Go back</button>
        </div>
    )
}

export default GenreSelect;