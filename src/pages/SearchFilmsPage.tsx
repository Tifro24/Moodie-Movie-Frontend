
import { useState, useEffect } from "react";
import config from "../config";
import {  useNavigate } from "react-router-dom";

function SearchFilmsPage(){
    const [query, setQuery] = useState("");
    const [films, setFilms] = useState<{title: string; description: string}[]>([]);
    const[filteredFilms, setFilteredFilms] = useState<{title: string; description: string}[]>([])
    const[fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();


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
                        </div>
                    ))
                ) : query ? (
                    <p>No movies found.</p>
                ) : (
                    <p>Start typing to search for a film...</p>
                )}
             </div>
        </div>
    );
};



export default SearchFilmsPage;