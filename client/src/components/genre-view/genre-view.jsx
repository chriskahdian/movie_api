import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export class GenreView extends Component {
// export default class GenreView extends Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
        const { movie, genre } = this.props
        if (!movie) return null;
        return (
            <div>
                <Container>
                    <Card>
                    <Card.Body>
                        <Card.Title>{movie.Genre.Name}</Card.Title>
                        <Card.Text>{movie.Genre.Description}</Card.Text>
                        <Link to={'/'}><button>Back</button></Link>
                    </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}
