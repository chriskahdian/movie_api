import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";



export default class GenreView extends Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
        const { movie, genre } = this.props
        if (!genre) return null;
        return (
            <div>
                <Container>
                    <Card>
                    <Card.Body>
                        <Card.Title>{genre.Name}</Card.Title>
                        <Card.Text>Description: {genre.Description}</Card.Text>
                        <Link to={'/'}><button>Back</button></Link>
                    </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}
