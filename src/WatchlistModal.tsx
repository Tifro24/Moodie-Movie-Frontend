import React, { useState, useEffect } from "react";
import config from "./config";

interface Film {
    id: number;
    title: string;
}

interface Watchlist {
    id: number;
    name: string;
    mood: {id: number, mood: string};
    films: Film[]
}

interface WatchlistModalProps {
    watchlist: Watchlist | null;
    onClose: () => void;
    onAddFilm: (watchlistId: number, film: Film) => void;
    onRemoveFilm: (watchlistId:number, filmId: number) => void;
}

const WatchlistModal: React.FC<WatchlistModalProps> = ({
    watchlist,
    onClose,
    onAddFilm,
    onRemoveFilm,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredFilms, setFilteredFilms] = useState<Film[]>([]);
    const [allFilms, setAllFilms] = useState<Film[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/films`)
        .then((response) => response.json())
        .then((data) => {
            setAllFilms(data);
            setFilteredFilms(data)
        })
        .catch((error) => console.error("Error fetching films: ", error))
    }, [])

    useEffect(() => {
        if (searchQuery.trim() === ""){
            setFilteredFilms(allFilms)
        } else {
            setFilteredFilms(
                allFilms.filter((film) =>
                    film.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, allFilms])

    if (!watchlist) return null;

    return (
        <div className="watchlist-modal-overlay" onClick={onClose}>
            <div className="watchlist-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{watchlist.name}</h2>
                <p>{watchlist.mood.mood}</p>

                <h3>Films in this watchlist:</h3>
                <ul>
                    {watchlist.films.map((film, index) => (
                        <li key={index}>
                            {index + 1}. {film.title} {" "}
                            <button onClick={() => onRemoveFilm(watchlist.id, film.id)}>❌</button>
                        </li>
                    ))}
                </ul>
                
                <div className="add-film-section">
                    <input 
                    type="text"
                    placeholder="Search for a film..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                    <ul className="search-results">
                        {filteredFilms.map((film) => (
                            <li key={film.id} onClick={() => onAddFilm(watchlist.id, film)}>
                                ➕{film.title}
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={onClose} className="close-btn">Close</button>

            </div>
        </div>
    );
};

export default WatchlistModal