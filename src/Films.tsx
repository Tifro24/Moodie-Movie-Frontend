import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Cast {
    fullName: string;
  }
  
  interface Film {
    title: string;
    description: string;
    cast: Cast[];
  }

function Films() {
    const [films, setFilms] = useState<Film[]>([]);
    const [searchParams] = useSearchParams();
    const genre = searchParams.get("genre")

    console.log("Selected Genre:", genre);

    useEffect(() => {
        fetch(`http://localhost:8080/films/byGenre?genre=${genre}`)
        .then((response) => response.json())
        .then((data) => setFilms(data));
    }, [genre])

return(
        <div>
            <h1>Films in {genre}</h1>
            <div className="container">
                {films.map((film) => (
                    <div key={film.title} className="filmTitle">
                        <h2>{film.title}</h2>
                        <p>{film.description}</p>
                        <p>Actors:</p>
                        <ul>
                            {film.cast && film.cast.map((castMember, index) =>(
                                <li key={index}>{castMember.fullName}</li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    )

}

export default Films;