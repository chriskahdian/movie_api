
const cors = require('cors');
const {check, validationResult} = require('express-validator');
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1) { 
      //if a specific origin isn't found on the list of allowed origins
      let message = "The CORS policy for this application doesn't allow access from this origin" + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

/* rest of code goes here*/
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
// mongoose.connect("mongodb://localhost:27017/MyFlixDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express"),
  morgan = require("morgan");
  bodyParser = require('body-parser');
const app = express();
app.use(express.static("public"));
app.use(morgan("common"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(bodyParser.json());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');
//ENDPOINTS

//GET homepage
app.get("/", function (req, res) {
  res.send("Welcome to MyFlix!");
});

//GET all movies' data
// app.get("/movies", function (req, res) {
//   res.json(Movies);
// });
app.get(
  '/movies',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //res.json(topmovies);
    Movies.find()
      .then(movies => {
        res.status(201).json(movies);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//GET 1 movie's data
// app.get("/movies/:Title", (req, res) => {
//   res.json(
//     movies.find((movie) => {
//       return movie.Title === req.params.Title;
//     })
//   );
// });
app.get(
  '/movies/:Title',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then(movie => {
        res.json(movie);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//GET 1 director's data
// app.get("/movies/Director/:Name", (req, res) => {
//   res.json(
//     movies.find((movie) => {
//       return movie.Director.Name === req.params.Name;
//     })
//   );
// });
app.get(
  '/movies/director/:Director',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Director })
      .then(movie => {
        res.json(movie.Director);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);


//GET 1 genre's data
// app.get("/movies/Genre/:Name", (req, res) => {
//   res.json(
//     movies.find((movie) => {
//       return movie.Genre.Name === req.params.Name;
//     })
//   );
// });
app.get(
  '/movies/genre/:Genre',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Genre })
      .then(movie => {
        res.json(movie.Genre);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//POST new user
app.post('/users', 
  [
  check('Username', 'Username is required').isLength({min:5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
  check('Password', 'Password is reuqired').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
  ],  (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: error.array()});
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then(user => {
        if (user) {
          return res.status(400).send(req.body.Username + ' already Exists');
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  }
);


//GET users
app.get('/users',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET user by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  }
);

//PUT user update
// app.put("/users/:Username", (req, res) => {
//   res.json(
//     users.find((user) => {
//       return user.Username === req.params.Username;
//     })
//   );
// });
app.put('/users/:Username',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


//POST user's 1 new favorite
// app.post("users/:Username/movies/:MovieID", (req, res) => {
//   res.status(500).send("Succesfully added movie to favorites!");
// });
// replace ":MovieID" w 5f7a67c25cd095b136b5dd81 from ObjectId("5f7a67c25cd095b136b5dd81"),
app.post('/users/:Username/movies/:MovieID',
passport.authenticate('jwt', { session: false }),
(req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavMovs: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});



//DELETE user's 1 favorite
// app.delete("users/:Username/favorites", (req, res) => {
//   res.status(500).send("Successfully removed movie from favorites.");
// });
app.delete(
  '/users/:Username/movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavMovs: req.params.MovieID } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


//DELETE user
// app.delete("/users/:Username", (req, res) => {
//   res.status(500).send("User Deleted.");
// });
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then(user => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('Error: ' + err);
      });
  }
);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log("Listening on Port " + port);
});
