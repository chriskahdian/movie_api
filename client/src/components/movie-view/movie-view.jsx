import React from 'react';

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        // const {movie} = this.props;
        const {movie, clearState} = this.props;
        if (!movie) null;
        return(
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImageURL}/>
                <div className="movie-title">
                    <span className="label">Title: {movie.Title}</span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div>
                    <button onClick={clearState}>Back to Main</button>
                </div>
            </div>
        );
    }
}