
import { useState, useEffect } from "react";
import config from "../config";

function SearchFilmsPage(){
    const [query, setQuery] = useState("");{
    const [films, setFilms] = useState<{title: string; description: string}[]>([]);
    const[filteredFilms, setFilteredFilms] = useState<{title: string; description: string}[]>([])

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

    return (
        <div className="search-films-page">
            <h1>Search Films</h1>
            <input type="text"
             value={query} 
             placeholder="Type to search..."
             onChange={(e) => setQuery(e.target.value)}
             className="search-box" />

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

}

export default SearchFilmsPage;