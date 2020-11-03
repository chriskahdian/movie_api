import React from 'react';

export class MovieCard extends React.Component {
    render() {
        //this is given to the <MovieCard/> component by MainView, connected to database by API
        const {movie, onClick} = this.props;
        return (
            <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}