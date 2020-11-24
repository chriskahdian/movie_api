import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";


import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import MoviesList from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { About } from "../header/about";
import { Contact } from "../header/contact";
import { ProfileView } from "../profile-view/profile-view";
import { UpdateView } from "../update-view/update-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setMovies, setUsername } from '../../actions/actions';


class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // componentDidMount() {
  //   axios
  //     .get("https://myflix001.herokuapp.com/movies")
  //     .then((response) => {
  //       //assign the result to the state
  //       this.setState({
  //         movies: response.data,
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  clearState() {
    this.setState({
      selectedMovie: null,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflix001.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
        // this.setState({
        //   movies: response.data,
        // });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.setState({
      user: null,
    });
  }

  // onLoggedIn(user) {
  //   this.setState({
  //     user,
  //   });
  // }

  render() {
    // const { movies, user } = this.state;
    let { movies } = this.props;
    let { user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <Container className="main-view" fluid="true">
          {/* Nav start */}
          <Navbar sticky="top" expand="lg" className="mb-2 navbar-styles">
            <Navbar.Brand className="navbar-brand">
              <Link to={`/`}>myFlix001</Link>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="bg-light"
            />
            <Navbar.Collapse
              className="justify-content-end navbar-light"
              id="basic-navbar-nav"
            >
              {!user ? (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link">Login</Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link">Register</Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={`/`}>
                    <Button variant="link" onClick={() => this.logOut()}>
                      Log out
                    </Button>
                  </Link>
                  <Link to={`/users/`}>
                    <Button variant="link">Account</Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="link">Movies</Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>
          {/* Nav end */}

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
                return <MoviesList movies={movies}/>;
              // return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />

          {/* <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView logInFunc={(user) => this.onLoggedIn(user)} />
                );
              return <MoviesList movies={movies} />;
            }}
          /> */}
          <Route
            path="/register"
            render={() => (
              <RegistrationView
                onLoggedIn={(user) => this.onLoggedIn(user)}
              />
            )}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => (
              <DirectorView
                director={movies.find(
                  (m) => m.Director.Name === match.params.name
                )}
                movies={movies}
                addToFavourites={() => addToFavourites(movie)}
              />
            )}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => (
              <GenreView
                movie={movies.find((m) => m.Genre.Name === match.params.name)}
                movies={movies}
                addToFavourites={() => addToFavourites(movie)}
              />
            )}
          />
          <Route
            path="/users/"
            render={() => (
              <ProfileView movies={movies} logOutFunc={() => this.logOut()} />
            )}
          />
          <Route path="/Update/:name" render={() => <UpdateView />} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
