import React from 'react';
import { connect } from 'react-redux';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss'

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <div>
      <Row>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Row>
      <Row className="movies-list">
        {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
      </Row>
    </div>
  )
}

export default connect(mapStateToProps)(MoviesList);
