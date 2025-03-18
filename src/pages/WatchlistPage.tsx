import {useState, useEffect} from "react";
import config from "../config";
import { Watchlist } from "../Watchlist";
import WatchlistModal from "../WatchlistModal";

function WatchlistPage(){
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist| null>(null);
    const [newWatchlistName, setNewWatchlistName] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [moods, setMoods] = useState<string[]>([]);


    //Fetch existing watchlists
    useEffect(() => {
    fetch(`${config.apiUrl}/watchlist`)
    .then((response) => response.json())
    .then((data) => setWatchlists(data))
    .catch((error) => console.error("Error fetching watchlists:", error));

    // Fetch available moods
    fetch(`${config.apiUrl}/preferences`)
    .then((response) => response.json())
    .then((data) => setMoods(data.map((m:any) => m.mood)))
    .catch((err) => console.error("Error fetching moods:", err));
}, []);

 // Handle selecting  a watchlist  
const handleSelectWatchlist = (watchlist : Watchlist) => {
    setSelectedWatchlist(watchlist);
};

// Handle closing the modal
const handleCloseModal = () => {
    setSelectedWatchlist(null)
};

const handleCreateWatchlist = () => {
    if (!newWatchlistName.trim() || !selectedMood) return;

    fetch(`${config.apiUrl}/watchlist`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({name: newWatchlistName, mood: selectedMood}),
    })
    
    .then((response) => response.json())
    .then((newWatchlist) => {
        setWatchlists([...watchlists, newWatchlist]);
        setNewWatchlistName("");
        setSelectedMood("")
    })
    .catch((err) => console.error("Error creating watchlist:", err));
};

// Handle deleting a watchlist
const handleDeleteWatchlist = (watchlistId: number) => {
    fetch(`${config.apiUrl}/watchlist/${watchlistId}`, {method: "DELETE"})
    .then(() => {
        setWatchlists(watchlists.filter((w) => w.id !== watchlistId));
    })
    .catch((err) => console.error("Error deleting watchlist:", err))
}



return (
    <div className="watchlist-container">
        <h1>Your Watchlists</h1>

        {/* Create watchlist */}
        <div className="create-watchlist">
           <input 
           type="text"
           placeholder="Enter watchlist name..."
           value={newWatchlistName}
           onChange={(e) => setNewWatchlistName(e.target.value)} />

           <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
            <option value="">Select a mood</option>
            {moods.map((mood, index) => (
                <option key={index} value={mood}>
                    {mood}
                </option>
            ))}
           </select>

           <button onClick={handleCreateWatchlist}>Create Watchlist</button>
        </div>
        
        {/* Watchlist display*/}

        <ul className="watchlist-ul">
            {watchlists.map((watchlist : Watchlist) => (
                <li className="watchlist-li" key={watchlist.id}>
                    <span onClick={() => handleSelectWatchlist(watchlist)}>
                        {watchlist.name} ({watchlist.mood.mood})
                    </span>
                    <button className="delete-btn" onClick={() => handleDeleteWatchlist(watchlist.id)}>🗑️</button>
                </li>
            ))}
        </ul>


        {/* 🔹 Watchlist Modal */}  
        
        {selectedWatchlist && (
            <WatchlistModal 
                watchlist={selectedWatchlist}
                onClose={handleCloseModal}
                onAddFilm={(watchlistId, film) => {
                    fetch(`${config.apiUrl}/watchlist/${watchlistId}/add-film/${film.id}`, {
                        method: "POST",
                    })
                        .then((response) => response.json())
                        .then((updatedWatchlist) => {
                            setWatchlists((prev) =>
                                prev.map((w) => (w.id === watchlistId ? updatedWatchlist : w))
                            );
                        })
                        .catch((err) => console.error("Error adding film:", err));
                }}
                
                onRemoveFilm={(watchlistId, filmId) => {
                    fetch(`${config.apiUrl}/watchlist/${watchlistId}/remove-film/${filmId}`, {
                        method:"DELETE",
                    })
                    .then((response) => response.json())
                    .then((updatedWatchlist) => {
                        setWatchlists((prev) =>
                            prev.map((w) => (w.id === watchlistId ? updatedWatchlist : w))
                        );
                    })
                    .catch((err) => console.error("Error deleting film", err));
                }}
            />
        )}
    </div>
 );

};

export default WatchlistPage
