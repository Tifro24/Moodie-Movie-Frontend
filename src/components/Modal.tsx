import { useState, useEffect } from "react";
import { Film } from "./Watchlist";
import { useWatchlistActions } from "../hooks/useWatchlistActions";
import SelectWatchlistModal from "../components/SelectWatchlistModal";
import config from "../config";




interface Cast{
    fullName: string;
}

interface FilmModalProps{
    film: {
        id: number
        title: string;
        description: string;
        releaseYear?: number;
        language: string;
        length?: number;
        rating?: string;
        cast: Cast[]
        poster: string;
    }

    onClose: () => void;
}

function FilmModal ({film, onClose} : FilmModalProps){

    const [chosenFilm, setChosenFilm] = useState< Film | null>(null)
     const {watchlists, setWatchlists, onConfirmAdd} = useWatchlistActions();

    useEffect(() => {
        fetch(`${config.apiUrl}/watchlist`)
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched watchlists:", data)
            setWatchlists(data)
        })
        .catch((error) => console.error("Error fetching watchlists:", error));
    }, [])

    useEffect(() => {
        if (chosenFilm) {
            console.log(`Updated chosenFilm: ${chosenFilm.title} - ID: ${chosenFilm.id}`);
        }
    }, [chosenFilm]);

    return(
    <div>
        
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={film.poster} alt="Film Poster" className="modal-film-poster" />
            <div className="modal-text"> 
                <h2>{film.title}</h2>
                <p><strong>Description: </strong>{film.description}</p>
                <p><strong>Language: </strong>{film.language}</p>
                <p><strong>Cast:</strong></p>
                <ul>
                    {film.cast.map((actor,index) => (
                    <li key={index}>{actor.fullName}</li>
                    ))}
                </ul>
                <button onClick={() => {
                    setChosenFilm(film)
                    console.log(`${film.title} film and ${film.id}`);}}>
                        ➕ Add to Watchlist
                </button>
                <button onClick={onClose}>Close</button>
            </div>
           
        </div>
        {chosenFilm && (
                <SelectWatchlistModal
                    chosenFilm={film}
                    onClose={() => setChosenFilm(null)}
                    watchlists={watchlists}
                    onConfirmAdd={onConfirmAdd} 
                />
             ) }
    </div>
        
    )
}

export default FilmModal;