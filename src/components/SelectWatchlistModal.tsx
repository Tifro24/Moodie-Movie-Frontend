import React, {useState, useEffect} from "react";
import config from "../config";
import { Watchlist, Film } from "./Watchlist";

interface SelectWatchlistModalProps {
    chosenFilm : Film | null;
    onClose: () => void;
    watchlists : Watchlist[];
    onConfirmAdd : (watchlistId: number, film: Film, watchlistName : string) => void;
}

const SelectWatchlistModal: React.FC<SelectWatchlistModalProps> = ({
    chosenFilm,
    onClose,
    onConfirmAdd,
}) => {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (chosenFilm) {
                fetch(`${config.apiUrl}/watchlist`)
            .then((response) => response.json())
            .then((data) => {
                setWatchlists(data);
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching watchlists", error);
                setError("Failed to load watchlists");
                setLoading(false);    
            });
        }
    }, [chosenFilm])

    if (!chosenFilm) return null

    return(
        <div className="watchlist-modal-overlay" onClick={onClose}>
            <div className="watchlist-modal" onClick={(e) => e.stopPropagation}>
                <h2>Select a Watchlist</h2>
                <p>Adding: <strong>{chosenFilm.title}</strong></p>

                {loading ? (
                    <p>Loading watchlists...</p>
                ) : error ? (
                    <p className="error">{error}</p>
                ) : watchlists.length === 0 ? (
                    <p>No watchlists available. Please create on first</p>
                ) : (
                    <ul className="watchlist-options">
                        {watchlists.map((watchlist) => (
                            <li className="watchlist-options-list" key={watchlist.id} onClick={() => onConfirmAdd(watchlist.id, chosenFilm, watchlist.name)}>
                                {watchlist.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SelectWatchlistModal;