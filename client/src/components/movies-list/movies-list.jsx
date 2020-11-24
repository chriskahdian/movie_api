import React from 'react';
import { connect } from 'react-redux';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
      <Container>
        <Row>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
        </Row>
      </Container>
     
    </div>;
}

export default connect(mapStateToProps)(MoviesList);
