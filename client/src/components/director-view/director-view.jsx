import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export class DirectorView extends Component {
// export default class DirectorView extends Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
        const { movie, director } = this.props
        if (!director) return null;
        return (
            <div>
                <Container>
                    <Card>
                    <Card.Body>
                        <Card.Title>{director.Director.Name}</Card.Title>
                        <Card.Text>{director.Director.Bio}</Card.Text>
                        <Link to={'/'}><button>Back</button></Link>
                    </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}
