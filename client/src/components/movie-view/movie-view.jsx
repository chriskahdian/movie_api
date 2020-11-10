import React from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    addFavorite(movie) {
        let token = localStorage.getItem("token");
        let url =
          "https://myflix001.herokuapp.com/users/" +
          localStorage.getItem("user") +
          "/Movies/" +
          movie._id;
    
        console.log(token);
    
        axios
          .post(url, "", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log(response);
            window.open("/client", "_self");
          });
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
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div>
                    <Button variant="link" onClick={() => this.addFavorite(movie)}>
                        Add Favorite
                    </Button>
                </div>
                <div>
                    <button onClick={clearState}>Back to Main</button>
                </div>
            </div>
        );
    }
}