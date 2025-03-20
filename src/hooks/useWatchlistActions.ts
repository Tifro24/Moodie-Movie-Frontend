import { useState } from "react";
import config from "../config";
import { Film } from "../components/Watchlist";
import { Watchlist } from "../components/Watchlist";

export function useWatchlistActions() {
    const [watchlists, setWatchlists] = useState<Watchlist[]>([]);

    const onConfirmAdd = (watchlistId: number, film: Film, watchlistName : string) => {

        console.log(`watchlistId : ${watchlistId}`)
        console.log(`filmId: ${film.id}`)
        console.log(`film title: ${film.title}`)

        fetch(`${config.apiUrl}/watchlist/${watchlistId}/add-film/${film.id}`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"}
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to add film");
            return response.json();
        })
        .then(() => {
            alert(`"${film.title}" has been successfully added to "${watchlistName}"`)
        })
        .catch((err) => {
            console.error("Error adding film:", err);
            alert(`${film.title} is already in ${watchlistName}`)   
        });
        
    };

    return {watchlists, setWatchlists, onConfirmAdd}
}