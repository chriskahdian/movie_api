import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import './movie-view.scss'

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    let url =
      "https://moviesmoviesmovies.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          favoriteMovies: response.data.FavMovs,
        });
      });
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://moviesmoviesmovies.herokuapp.com/users/" +
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
        window.open("/movies/" + movie._id, "_self");
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://moviesmoviesmovies.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/Movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/movies/" + movie._id, "_self");
      });
  }

  render() {
    const { movie, clearState } = this.props;
    const { favoriteMovies } = this.state
    let addOrRem;
    if (!movie) return null;
    if (favoriteMovies.includes(movie._id)) {
      addOrRem = 
        <Link onClick={() => this.removeFavorite(movie)}>
          Remove Favorite
        </Link>
    } else { 
      addOrRem = 
        <Link onClick={() => this.addFavorite(movie)}>
          Add Favorite
        </Link>
    }
    return (
      <div className="movie-view">
        <div className="movie-title">
            <h1>{movie.Title}</h1>
        </div>
        <hr/>
        <div className="movie-description">
          {movie.Description}
        </div>
        <div>
          <span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              {movie.Genre.Name}
            </Link>
          </span>
          <span>{" "+"|"+" "}</span>
          <span>
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </span>
          <span>{" "+"|"+" "}</span>
          <span>{addOrRem}</span>
          <span>{" "+"|"+" "}</span>
          <span><Link to={'/'}>All Movies</Link></span>
        </div>
        <hr/>
        <div className="movie-poster">
          <img src={movie.ImageURL} />
        </div>
      </div>

    );
  }
}