import './Movie.css'

function Movie({ movie, handleAdd, handleDelete, status }) {
    return (
        <li className='relative' key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <h3>{movie.Year}</h3>
            { status === 'result' ? 
            <button onClick={() => handleAdd(movie)}>Ajouter</button> : 
            <button onClick={() => handleDelete(movie.imdbID)}>Supprimer</button>}
        </li>
    )
}

export default Movie