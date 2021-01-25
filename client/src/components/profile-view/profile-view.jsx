import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import axios from "axios";
import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
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
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavMovs,
        });
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
        this.componentDidMount();
      });
  }

  handleDelete() {
    if (!confirm("Are you sure?")) return;
    let token = localStorage.getItem("token");
    let url =
      "https://moviesmoviesmovies.herokuapp.com/users/" + this.state.username;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response));

    localStorage.removeItem("token");
    window.open("/", "_self");
  }

  render() {
    const { movies } = this.props;
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!movies) alert("Please sign in");
    return (
      <div>
        <div className="accountProfileDetailsTitle">
            <h1>Account</h1>
        </div>
        <div className="accountProfileDetails">
          <div>
            Username:
            <span className="indivDetail">{this.state.username}</span>
          </div>
          <div>
            Password:
            <span className="indivDetail">(hidden)</span>
          </div>
          <div>
            Date of Birth:
            <span className="indivDetail">{this.state.dob}</span>
          </div>
          <div>
            Email:
            <span className="indivDetail">{this.state.email}</span>
          </div>
        </div>
        <div className="buttons">
          <Link to={`/update/${this.state.username}`}>
            <Button>Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => this.handleDelete()}>
            Delete User
          </Button>
          <Link to={`/`}>
            <Button>All Movies</Button>
          </Link>
        </div>
        <hr/>
        <div className="favoriteMoviesTitle">
          <h1>Favorite Movies</h1>
        </div>
        <Row className="FavoriteMovies">
          {favoriteMovieList.map((movie) => {
            return (
              <div className="profileMovieCard">
                <MovieCard key={movie._id} movie={movie} />
                  <Button className="removeFavButton" onClick={() => this.removeFavorite(movie)}>
                    Remove Favorite
                  </Button>
              </div>
            );
          })}
        </Row>
      </div>
    );
  }
}
