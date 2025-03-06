import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Cast {
    fullName: string;
  }
  
  interface Film {
    title: string;
    description: string;
    cast: Cast[];
  }

function Films() {
    const [films, setFilms] = useState<Film[]>([]);
    const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre")

    console.log("Selected Genre:", genre);

    useEffect(() => {
        if (!genre) return;

        const fetchFilms = async () => {
            try {
                const response = await fetch(`http://localhost:8080/films/byGenre?genre=${encodeURIComponent(genre)}`);
                if (!response.ok){
                    throw new Error("Failed to fetch films")
                }
                const data = await response.json();
                setFilms(data);
            } catch (error) {
                console.error("Error fetching films:", error)
            }
        };
        fetchFilms();
    }, [genre])

return(
        <div>
            <h1>Films in {genre}</h1>
            <div className="film-container">
                {films.length > 0 ? (
                    films.map((film) => (
                        <div key={film.title} className="film-card">
                            <h2>{film.title}</h2>
                            <p>{film.description}</p>
                            <p>Actors:</p>
                            <ul>
                                {film.cast?.length > 0 ? (
                                    film.cast.map((castMember, index) => (
                                            <li key={index}>{castMember.fullName}</li>
                                    ))
                            ) : (
                                <li>No cast information available</li>
                            )}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No films found for this genre.</p>
            )}
            </div>
        </div>
    )

}

export default Films;