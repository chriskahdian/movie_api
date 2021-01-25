import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import './director-view.scss'
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
        const { movies, director } = this.props
        if (!director) return null;
        return (
            <div>
                <div className="cardTitle">
                    <h1>{director.Director.Name}</h1>
                </div>
                <hr/>
                <div className="cardDesc">
                    {director.Director.Bio}
                </div>
                <div className="allMoviesLink">
                    <Link to={'/'}>All Movies</Link>
                </div>
                <hr/>
                <Row className="moviesOfDirector">
                    {movies.map((movie) => {
                        if (movie.Director.Name === director.Director.Name) {
                            return (
                                    <MovieCard key={movie._id} movie={movie} />
                            );
                        }
                    })}
                </Row>
            </div>
        )
    }
}












// import React, { Component } from 'react'
// import Card from "react-bootstrap/Card";
// import { Link } from "react-router-dom";
// import Row from 'react-bootstrap/Row';
// import './director-view.scss'
// import { MovieCard } from '../movie-card/movie-card';



// export class DirectorView extends Component {
//     constructor() {
//       super();
//       this.state = {};
//     }
  
//     render() {
//         const { movies, director } = this.props
//         if (!director) return null;
//         return (
//             <div>
//                 <div className="directorDescDiv">
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>
//                                 {director.Director.Name}
//                                 <Link className="backButton" to={'/'}><button>Back</button></Link>
//                             </Card.Title>
//                             <Card.Text>{director.Director.Description}</Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </div>
//                 <Row className="moviesOfDirector">
//                     {movies.map((movie) => {
//                         if (movie.Director.Name === director.Director.Name) {
//                             return (
//                                 <Card>
//                                     <MovieCard key={movie._id} movie={movie} />
//                                 </Card>
//                             );
//                         }
//                     })}
//                 </Row>
//             </div>
//         )
//     }
// }
