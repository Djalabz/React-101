import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from './Movie'
import './Movies.css'

function Movies() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [favorites, setFavorites] = useState([])
    const [view, setView] = useState('search')

    // Ajout en BDD via une API express
    useEffect(() => {
        axios.post('http://localhost:3000/movies/add', favorites)
        .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
    }, [favorites])

    // Gestion du localStorage avec useEffect 
    // (on get dans un premier temps, et on ajoute des fav dès que favorites change)
    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem('favorites'))
        setFavorites(fav)
    }, [])
    
    // useEffect(() => {
    //     localStorage.setItem('favorites', JSON.stringify(favorites))
    // }, [favorites])


    // Je viens faire l'appel API afin de récupérer les films 
    const getData = (movie) => {
        axios.get(`http://www.omdbapi.com/?apikey=49ba54f&s=${movie}&page=1`)
        .then((res) => {
            const { Search } = res.data
            setResults([])
            Search.map(item => {
                setResults(prevItems => [ ...prevItems, item])
            })
        })
        .catch((err) => console.log(err))
    }

    // Mes fonctions d'ajout, de suppression, de changement d'input et d'affichage
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        getData(search)
        setView('search')
    }

    const handleAdd = (movie) => {
        setFavorites(favorites => [ ...favorites, movie])
    }

    const handleDelete = (id) => {
        setFavorites(favorites => favorites.filter(item => item.imdbID !== id))
    }

    const showFavorites = () => {
        setView('favorites')
    }

    return (
        <div className="movies absolute top-16 left-0 w-screen z-0">
            <h1 className="mb-8 mt-0">My movie db !</h1>
            <div className="search-bar">
                <input type='text' value={search} onChange={(e) => handleChange(e)}  />
                <button onClick={() => handleSearch()}>Chercher</button>
                <button onClick={() => showFavorites()}>Favoris</button>
            </div>
            {view === 'search' && 
            <ul className="results grid-cols-4">
                {results.map((movie) => (
                    <Movie key={movie.imdbID} status='result' movie={movie} handleAdd={handleAdd} />
                ))}
            </ul>}
            {view === 'favorites' && 
            <ul className="favorites">
                {favorites.map((movie) => (
                    <Movie key={movie.imdbID} status='favorite' movie={movie} handleDelete={handleDelete} />
                ))}
            </ul>}
        </div>
    )
}

export default Movies