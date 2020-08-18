import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom'

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList'
import MovieCard from './Movies/MovieCard'
import Movie from './Movies/Movie'

const App = (props) => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);
  
  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    // setSaved(movieList.map(movie => (
    //    movie.id === id
    // )))

    setSaved(id)
  };

  return (
    <div>
      <SavedList list={saved} />
      
    <div>
      

    <Switch>
     <Route path='/movies/:id'>
      <Movie  addSaved= {addToSavedList}/>
     </Route>

     <Route  path='/'>
      <MovieList movies={movieList}/>
     </Route>

     </Switch>
    </div>
    </div>
  );
};

export default App;
