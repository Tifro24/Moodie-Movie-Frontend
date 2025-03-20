import {useState, useEffect} from "react";
import config from "../config";
import { Watchlist } from "../components/Watchlist";
import WatchlistModal from "../components/WatchlistModal";
import { useNavigate } from "react-router-dom";

function WatchlistPage(){
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
    const [selectedWatchlist, setSelectedWatchlist] = useState<Watchlist| null>(null);
    const [newWatchlistName, setNewWatchlistName] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [moods, setMoods] = useState<{id: number; mood: string}[]>([]);
    const navigate = useNavigate();


    //Fetch existing watchlists
    useEffect(() => {
    fetch(`${config.apiUrl}/watchlist`)
    .then((response) => response.json())
    .then((data) => {
        console.log("Fetched watchlists:", data)
        setWatchlists(data)
    })
    .catch((error) => console.error("Error fetching watchlists:", error));

    // Fetch available moods
    fetch(`${config.apiUrl}/preferences`)
    .then((response) => response.json())
    .then((data) => {
        console.log("Moods fetched:", data);
        setMoods(data);
    })
    .catch((err) => console.error("Error fetching moods:", err));
}, []);


 // Handle selecting  a watchlist  
const handleSelectWatchlist = (watchlist : Watchlist) => {
    setSelectedWatchlist(watchlist);
};

// Handle creating the watchlist
const handleCreateWatchlist = () => {
    if (!newWatchlistName.trim() || !selectedMood) {
        console.error(("Missing name or mood when creating watchlist"))
        return;
    } 

    const sessionId = localStorage.getItem("sessionId") ?? "";
    const selectedMoodId = Number(selectedMood);

    const selectedMoodObject = moods.find((m: any) => Number(m.id) === selectedMoodId);

if (!selectedMoodObject) {
    console.error("Error: Could not find a matching mood.");
} else {
    console.log("Matched Mood:", selectedMoodObject);
}


    fetch(`${config.apiUrl}/watchlist?sessionId=${sessionId}&name=${encodeURIComponent(newWatchlistName)}&moodId=${selectedMoodId}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((newWatchlist) => {
        setWatchlists((prevWatchlists) => [...prevWatchlists, newWatchlist]);
        setNewWatchlistName("");
        setSelectedMood("");
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

        <button className="home-btn" onClick={() => navigate("/welcome")}>
            Home 
        </button>
        <h1>Your Watchlists</h1>

        {/* Create watchlist */}
        <div className="create-watchlist">
            <input 
            type="text"
            placeholder="Enter watchlist name..."
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)} />

            <div className="mood-dropdown">
                <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
                    <option value="">Select a mood</option>
                    {moods.map((m:any) => (
                        <option key={m.id} value={m.id.toString()}>
                            {m.mood}
                        </option>
                    ))}
                </select>
            </div>
            

           <button onClick={handleCreateWatchlist}>Create Watchlist</button>
        </div>
        
        {/* Watchlist display*/}

        <ul className="watchlist-ul">
            {watchlists.map((watchlist : Watchlist) => (
                <li className="watchlist-li" key={watchlist.id}>
                    <span onClick={() => handleSelectWatchlist(watchlist)}>
                        {watchlist.name} ({watchlist.mood.mood ?? "No mood"})
                    </span>
                    <button className="delete-btn" onClick={() => handleDeleteWatchlist(watchlist.id)}>🗑️</button>
                </li>
            ))}
        </ul>


        {/* Watchlist Modal */}  
        
        {selectedWatchlist && (
            <WatchlistModal 
                watchlist={selectedWatchlist}
                onClose={() => {
                    console.log("Closing modal");
                    setSelectedWatchlist(null);
                }}
                onAddFilm={(watchlistId, film) => {

                    console.log(`Attempting to add film ID ${film.id} to watchlist ID ${watchlistId}`);

                    

                    fetch(`${config.apiUrl}/watchlist/${watchlistId}/add-film/${film.id}`, {
                        method: "POST",
                        headers : {"Content-Type": "application/json"},
                    })
                        .then((response) => {
                        console.log(` Response Status: ${response.status}`);
                        if (!response.ok) throw new Error("Failed to add film");
                        return response.json();
                        })
                        .then((updatedWatchlist) => {
                            setWatchlists((prev) =>
                                prev.map((w) => (w.id === watchlistId ? updatedWatchlist : w))
                            );
                            setSelectedWatchlist(updatedWatchlist);
                        })
                        .catch((err) => console.error("Error adding film:", err));
                }}
                
                onRemoveFilm={(watchlistId, filmId) => {
                    fetch(`${config.apiUrl}/watchlist/${watchlistId}/remove-film/${filmId}`, {
                        method:"DELETE",
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to remove film")
                        }
                        return response.json()
                    })
                    .then((updatedWatchlist) => {
                        setWatchlists((prev) =>
                            prev.map((w) => (w.id === watchlistId ? updatedWatchlist : w))
                        );

                        setSelectedWatchlist(updatedWatchlist);
                    })
                    .catch((err) => console.error("Error deleting film", err));
                }}
            />
        )}
    </div>
 );

};

export default WatchlistPage
