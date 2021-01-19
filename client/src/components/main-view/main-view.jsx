import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
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
import './main-view.scss'

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
        this.props.setMovies(response.data);
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
  
  render() {

    let { movies } = this.props;
    let { user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
        <Container className="main-view" fluid="true">

          <Navbar sticky="top" expand="sm" className="navbar">
            <Navbar.Brand className="navbar-brand">
              <Link to={`/`}><h1>myFlix001</h1></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light"/>
            <Navbar.Collapse className="justify-content-end navbar-light" id="basic-navbar-nav">
              {!user ? (
                <div>
                  <Link to={`/`}>
                    <Button variant="link">Login</Button>
                  </Link>
                  <Link to={`/register`}>
                    <Button variant="link">Register</Button>
                  </Link>
                </div>
              ) : (
                <div className="navButtons">
                  <Link to={`/`}>
                    <Button variant="link">Movies</Button>
                  </Link>
                  <Link to={`/users/`}>
                    <Button variant="link">Account</Button>
                  </Link>
                  <Link to={`/`}>
                    <Button variant="link" onClick={() => this.logOut()}>
                      Log out
                    </Button>
                  </Link>
                </div>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
                // return <MoviesList movies={movies}/>
                return (
                  <Container className="movies-list">
                    <MoviesList movies={movies}/>
                  </Container>
                )
            }}
          />
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
                director={movies.find((m) => m.Director.Name === match.params.name)}
                movies={movies}
                addToFavourites={() => addToFavourites(movie)}
              />
            )}
          />
          <Route
            path="/genres/:name"
            render={({ match }) => (
              <GenreView
                genre={movies.find((m) => m.Genre.Name === match.params.name)}
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
