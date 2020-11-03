import React from 'react';
import axios from 'axios';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        //call the superclass constructor so React can initialize
        super();
        //initialize the state to an empty object
        this.state = {
            movies:null,
            selectedMovie: null
        };
    }
    // one of the "hooks" available in a React component
    componentDidMount() {
        axios.get('https://myflix001.herokuapp.com/movies')
            .then(response => {
                //assign the result to the state
                this.setState({
                    movies:response.data
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }
    
    buttonFunc() {
        this.setState({
            selectedMovie: null,
        });
    }

    render() {
        //if the state isn't initialized, this will throw on runtime before data initially loads
        const {movies, selectedMovie} = this.state;
        //before the movies have been loaded
        if(!movies) return <div className = "main-view"/>;
        return (
            <div className="main-view">
            { selectedMovie
                ? 
                    <MovieView
                        movie={selectedMovie}
                        buttonPropFromMain={() => this.buttonFunc()}
                    />
                :
                    movies.map(movie => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onClick={movie => this.onMovieClick(movie)}
                        />
                ))
            }
            </div>
        );
    }
}