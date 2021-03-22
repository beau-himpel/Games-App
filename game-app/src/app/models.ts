export interface User {
    userName: string;
}

export interface Game {
    imageUrl?: string;
    gameId: number;
    title: string;
    platform : string | Platform;
}

export interface GameDetails extends Game {
    genres: string[];
    overview: string;
    publishers: string [];
    releaseDate: Date;
}

export interface Platform {
    platformId: number;
    name: string;
}

export const apiUrl = "https://games.excellentpeople.com";