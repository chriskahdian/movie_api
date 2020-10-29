import React from 'react';
import axios from 'axios';

export class MainView extends React.Component {
    constructor() {
        //call the superclass constructor so React can initialize
        super();
        //initialize the state to an empty object
        this.state = {};
    }
    // one of the "hooks" available in a React component
    componentDidMount() {
        axios.get('<https://myflix001.herokuapp.com/movies>')
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
    
    render() {
        //if the state isn't initialized, this will throw on runtime before data initially loads
        const {movies} = this.state;
        //before the movies have been loaded
        if(!movies) return <div className = "main-view"/>;
        return (
            <div classname="main-view">
            { movies.map(movie => (
                <div className="movie-card" key={movie._id}> {movie.Title} </div>
            ))}
            </div>
        );
    }
}