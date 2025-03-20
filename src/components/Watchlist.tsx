export interface Cast{
    fullName: string;
}



export interface Film {
        id: number
        title: string;
        description: string;
        releaseYear?: number;
        language: string;
        length?: number;
        rating?: string;
        cast: Cast[]
        poster: string;
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