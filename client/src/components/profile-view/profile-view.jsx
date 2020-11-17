import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import "./profile-view.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import axios from "axios";

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
    // d = d.setDate(d.getDate() + 1);

    // var month = "" + (d.getMonth() + 1),
    //   day = "" + d.getDate(),
    //   year = d.getFullYear();

    // if (month.length < 2) month = "0" + month;
    // if (day.length < 2) day = "0" + day;

    // return [year, month, day].join("-");
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://myflix001.herokuapp.com/users/" +
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
        // this.props.setUsername(response.data.Username);
      });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   let url =
  //     "https://myflix001.herokuapp.com/users/" +
  //     localStorage.getItem("user");

  //   let user = {
  //     Username: this.state.username,
  //     Password: this.state.password,
  //     Email: this.state.email,
  //     Birthday: this.state.dob,
  //   };
  //   let token = localStorage.getItem("token");
  //   axios
  //     .put(url, user, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       alert("Profile Updated");
  //       this.props.setUsername(this.state.username);
  //     });
  // }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://myflix001.herokuapp.com/users/" +
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
      "https://myflix001.herokuapp.com/users/" + this.state.username;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response));

    localStorage.removeItem("token");
    // localStorage.removeItem("user");
    window.open("/", "_self");
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });
    // console.log(favoriteMovieList);

    if (!movies) alert("Please sign in");
    return (
      <div className="userProfile" style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col>
              <Form style={{ width: "36rem", float: "left" }}>
                <h1 style={{ textAlign: "center" }}>Profile Details</h1>
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.dob}</Form.Label>
                </Form.Group>
                {
                  <Link to={`/update/${this.state.username}`}>
                    <Button variant="primary" type="link">
                      Edit
                    </Button>
                  </Link>
                }
                <Button variant="danger" onClick={() => this.handleDelete()}>
                  Delete User
                </Button>
                <Link to={`/`}>
                  <Button variant="light" type="submit">
                    Back
                  </Button>
                </Link>
              </Form>
            </Col>
            <Col>
              <div
                className="favoriteMovies"
                style={{
                  float: "right",
                  textAlign: "center",
                  width: "28rem",
                }}
              >
                <h1>Favorite Movies</h1>
                {favoriteMovieList.map((movie) => {
                  return (
                    <div key={movie._id}>
                      <Card>
                        <Card.Body>
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Title>{movie.Title}</Card.Title>
                          </Link>
                        </Card.Body>
                      </Card>
                      <Button onClick={() => this.removeFavorite(movie)}>
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// ProfileView.propTypes = {
//   movies: PropTypes.array.isRequired,
// };