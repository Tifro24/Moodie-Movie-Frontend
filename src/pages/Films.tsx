import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilmModal from "../components/Modal";
import config from "../config";
import { Film } from "../components/Watchlist";



  

  const moviePosters = ["/movie-poster1.jpg", "/movie-poster2.jpg", "/movie-poster3.jpg", "/movie-poster4.jpg", "/movie-poster5.jpg",
                        "/movie-poster6.jpg", "/movie-poster7.jpg", "/movie-poster8.jpg", "/movie-poster9.jpg", "/movie-poster10.jpg"
   ]

function Films() {
    const [films, setFilms] = useState<Film[]>([]);
    const [selectedFilm, setSelectedFilm] = useState< Film | null>(null);
    const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre")
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    

    console.log("Selected Genre:", genre);

    useEffect(() => {
        if (!genre) return;

        const fetchFilms = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/films/byGenre?genre=${encodeURIComponent(genre)}`);
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

    const handleGoBack = () => {
        setFadeOut(true);
        setTimeout(() => {
            navigate(`/genres?mood=${genre}`, { replace: true });
            setFilms([]);
        }, 500);
    };

return(
    <div className={`films-page ${fadeOut ? "fade-out" : ""}`}>
            <h1 className="fade-in-title">Films in {genre}</h1>
            <div className="film-container">
                {films.map((film, index) => {
                    const poster = moviePosters[index % moviePosters.length];
                    return (
                        <div key={index} className="film-card" onClick={() => { console.log(film); setSelectedFilm({
                            id: film.id,
                            title: film.title,
                            description: film.description,
                            language: film.language,
                            cast: film.cast,
                            poster: poster,
                            
                        })}}>
                            <div>
                                <img src={poster} alt="Film Poster" className="film-poster" />
                                <h2>{film.title}</h2>
                                <p>{film.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button className="fade-in-button go-back-button" onClick={handleGoBack}>Go Back</button>
            {selectedFilm && <FilmModal film={selectedFilm} onClose={() => setSelectedFilm(null)} />}
        </div>
    
    )

    

}

export default Films;