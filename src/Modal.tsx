interface Cast{
    fullName: string;
}

interface FilmModalProps{
    film: {
        title: string;
        description: string;
        language: string;
        cast: Cast[]
        poster: string;
    }

    onClose: () => void;
}

function FilmModal ({film, onClose} : FilmModalProps){
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
                <button onClick={onClose}>Close</button>
            </div>
           
        </div>
    </div>
        
    )
}

export default FilmModal;