export interface Film {
    id: number;
    title: string;
    description: string;
    releaseYear: number;
    length: number;
    rating: string;
}

export interface Mood {
    id: number;
    mood: string;
}

export interface Watchlist {
    id: number;
    name: string;
    mood: Mood;
    films: Film[];
}