import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Movies.css'

function Movies() {
    // Nos données de type states
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)


    //// Nos useEffects pour le local storage

    // Récup les favoris depuis le local Storage si il y en a
    useEffect(() => {
        const favs = localStorage.getItem('favorites')
        if (favs) {
            setFavorites(JSON.parse(favs))
        }
    }, [])

    // Mettre en place les favoris à chaque changement du state "favorites"
    useEffect(() => {
        if (favorites.length > 0) {
        localStorage.setItem('favorites', JSON.stringify(favorites))}
    }, [favorites])


    // Notre appel API avec le terme de recherche
    const fetchAPI = () => {
        axios.get(`http://www.omdbapi.com/?apikey=49ba54f&s=${search}`)
        .then(res => {
            const { Search } = res.data
            setMovies(Search) 
        })
        .catch((err) => console.log(err))
    }


    // Mes fonctions d'ajout, de suppression, de changement d'input et d'affichage
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        setShowFavorites(false)
        fetchAPI()
    }

    const handleAdd = (movie) => {
        const inFavorite = favorites.some(fav => fav.imdbID === movie.imdbID)

        if (!inFavorite) {
            setFavorites(favs => [...favs, movie])
        }
    }

    const handleDelete = (id) => {
        const newFav =  favorites.filter((fav) => fav.imdbID !== id)
        setFavorites(newFav)
    }

    return (
        <div className="movies absolute top-16 left-0 w-screen z-0">
            <h1 className="mb-12 mt-0">My movie db !</h1>

            {/* Notre partie avec la barre de recherche */}
            <div className="search-bar mb-12">
                <input type='text' value={search} onChange={(e) => handleChange(e)}  />
                <button onClick={() => handleSearch()}>Chercher</button>
                <button onClick={() => setShowFavorites(!showFavorites)}>Favoris</button>
            </div>

            {/* Notre partie recherche de films */}
            {(!showFavorites && movies) &&
            <ul className='grid grid-cols-4'>
                {movies.map((movie) => (
                    <li className='relative flex flex-col justify-center items-center' key={movie.imdbID}>
                        <img className='mx-auto' src={movie.Poster} />
                        <h2>{movie.Title}</h2>
                        <h3 className='mb-8'>{movie.Year}</h3>
                        <button className='mt-12 absolute bottom-0 w-36' onClick={() => handleAdd(movie)}>Ajouter</button> : 
                    </li> 
                ))}
            </ul>}

            {/* Notre partie avec les favoris  */}
            {showFavorites && <ul className='grid grid-cols-4'>
                {favorites.map((movie) => (
                    <li className='relative flex flex-col justify-center items-center' key={movie.imdbID}>
                        <img className="mx-auto" src={movie.Poster} />
                        <h2>{movie.Title}</h2>
                        <h3 className='mb-16'>{movie.Year}</h3>

                        <button className='mt-12 absolute bottom-0 w-36' onClick={() => handleDelete(movie.imdbID)} >Supprimer</button>
                    </li> 
                ))}
            </ul> }
        </div>
    )
}

export default Movies