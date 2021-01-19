import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import './movie-card.scss'


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      
      <Link to={`/movies/${movie._id}`}>
        <Card className="movieCard" style={{ width: "16rem" }}>
          <Card.Img className="movieCardImage" variant="top" src={movie.ImageURL} />
          <Card.Body className="movieCardBody">
            <Card.Title className="movieCardTitle">{movie.Title}</Card.Title>
            <hr/>
            <Card.Text className="movieCardDesc">
              {movie.Description}
            </Card.Text>
            <Card.Text className="movieCardDeets">
                <Link to={`/genres/${movie.Genre.Name}`}>
                  {movie.Genre.Name}
                </Link>
                <span>
                  {" "+"|"+" "}
                </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  {movie.Director.Name}
                </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    );
  }
}