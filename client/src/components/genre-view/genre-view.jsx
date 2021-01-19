import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import './genre-view.scss'
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { movies, genre } = this.props
        if (!genre) return null;
        return (
            <div>
                <div className="cardTitle">
                    <h1>{genre.Genre.Name}</h1>
                </div>
                <hr/>
                <div className="cardDesc">
                    {genre.Genre.Description}
                </div>
                <div className="allMoviesLink">
                    <Link to={'/'}>All Movies</Link>
                </div>
                <hr/>
                <Row className="moviesOfGenre">
                    {movies.map((movie) => {
                        if (movie.Genre.Name === genre.Genre.Name) {
                            return (
                                <MovieCard key={movie._id} movie={movie} />
                            );
                        }
                    })}
                </Row>
            </div>
        )
    }
}