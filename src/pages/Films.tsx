import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilmModal from "../Modal";

interface Cast {
    fullName: string;
  }
  
  interface Film {
    title: string;
    description: string
    language: string
    cast: Cast[];
  }

  const moviePosters = ["../public/movie-poster1.jpg", "../public/movie-poster2.jpg", "../public/movie-poster3.jpg", "../public/movie-poster4.jpg", "../public/movie-poster5.jpg",
                        "../public/movie-poster6.jpg", "../public/movie-poster7.jpg", "../public/movie-poster8.jpg", "../public/movie-poster9.jpg", "../public/movie-poster10.jpg"
   ]

function Films() {
    const [films, setFilms] = useState<Film[]>([]);
    const [selectedFilm, setSelectedFilm] = useState<{ title: string; description: string; language: string; cast: Cast[]; poster: string } | null>(null);
    const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre")
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    

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