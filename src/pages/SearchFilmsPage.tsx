
import { useState, useEffect } from "react";
import config from "../config";
import {  useNavigate } from "react-router-dom";
import { Film } from "../components/Watchlist";
import SelectWatchlistModal from "../components/SelectWatchlistModal";
import { useWatchlistActions } from "../hooks/useWatchlistActions";




function SearchFilmsPage(){
    const [query, setQuery] = useState("");
    const [films, setFilms] = useState<Film[]>([]);
    const[filteredFilms, setFilteredFilms] = useState<Film[]>([])
    const[fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
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
    },[])


    useEffect(() => {
        fetch(`${config.apiUrl}/films`)
        .then((response) => response.json())
        .then((data) => setFilms(data))
        .catch((error) => console.error("Error fetching films: ", error))
    }, [])

    useEffect(() => {
        if (query.trim() === ""){
            setFilteredFilms([])
        } else{
            setFilteredFilms(
                films.filter((film) =>
                film.title.toLowerCase().includes(query.toLowerCase()))
            );
        }
    }, [query, films])

    const handleNavigation = () => {
        setFadeOut(true)
        const storedUserName = localStorage.getItem("userName") ?? "";
        setTimeout(() =>{
            navigate(`/welcome?userName=${encodeURIComponent(storedUserName)}`)
        }, 1000)

    }

 
    return (
        <div className={`search-films-page ${fadeOut ? "fade-out" : ""}`}>
            <div className="search-header">
                <div className="search-left">
                    <h1>Search Films</h1>
                    <input type="text"
                    value={query} 
                    placeholder="Type to search..."
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-box" />
                </div>
            

                <button className="fade-in-button go-back-button" onClick={ () => handleNavigation()}>Go Back</button>
            </div>
            

             <div className="film-container">
                {filteredFilms.length > 0 ? (
                    filteredFilms.map((film,index) => (
                        <div key={index} className="film-card">
                            <h3>{film.title}</h3>
                            <p>{film.description}</p>
                            <button onClick={() =>{setChosenFilm(film)}}>
                                    ➕ Add to Watchlist
                            </button>
                        </div>
                    ))
                ) : query ? (
                    <p>No movies found.</p>
                ) : (
                    <p>Start typing to search for a film...</p>
                )}
             </div>

             {chosenFilm && (
                <SelectWatchlistModal
                    chosenFilm={chosenFilm}
                    onClose={() => setChosenFilm(null)}
                    watchlists={watchlists}
                    onConfirmAdd={onConfirmAdd} 
                />
             )}
        </div>
    );
};



export default SearchFilmsPage;