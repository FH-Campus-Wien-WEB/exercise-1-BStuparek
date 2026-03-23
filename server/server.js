const express = require('express')
const path = require('path')
const app = express()

const fs = require("fs");
const { format, json } = require('express/lib/response');
const raw = fs.readFileSync("movie.json", "utf-8")
const movie = JSON.parse(raw)

const filteredMovie = pick(movie,keys); 

const movies = [{
              "Title":"The Lord of the Rings: The Fellowship of the Ring",
              "Released":"2001-12-19",
              "Runtime":"178",
              "Genres":["Adventure","Drama","Fantasy"],
              "Directors":["Peter Jackson"],
              "Writers":["J.R.R Tolkien","Fran Walsh","Philippa Boyens"],
              "Actors":["Elijah Wood","Ian Mckellen","Orlando Bloom"],
              "Plot":"A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron",
              "Poster":"https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_SX300.jpg",
              "MetaScore":92,
              "imdbRating":8.9,
            },
          {
              "Title":"American Psycho",
              "Released":"2000-4-14",
              "Runtime":"102",
              "Genres":["Crime","Drama","Horror"],
              "Directors":["Mary Harron"],
              "Writers":["Bret Easton Ellis","Mary Harron","Guinevere Turner"],
              "Actors":["Christian Bale","Justin Theroux","Josh Lucas"],
              "Plot":"A wealthy New York City investment banking executive, Patrick Bateman, hides his alternate psychopathic ego from his co-workers and friends as he delves deeper into his violent, hedonistic fantasies",
              "Poster":"https://m.media-amazon.com/images/M/MV5BNzBjM2I5ZjUtNmIzNy00OGNkLWIwZDMtOTAwYWUwMzA2YjdlXkEyXkFqcGc@._V1_SX300.jpg",
              "MetaScore":64,
              "imdbRating":7.6,
          },
          {
              "Title":"Goodfellas",
              "Released":"1990-09-21",
              "Runtime":"145",
              "Genres":["Biography","Crime","Drama"],
              "Directors":["Martin Scorsese"],
              "Writers":["Nicholas Pileggi","Martin Scorsese"],
              "Actors":["Robert De Niro","Ray Liotta","Joe Pesci",],
              "Plot":"The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito",
              "Poster":"https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_SX300.jpg",
              "MetaScore":92,
              "imdbRating":8.7,
          
          }]


const keys = ["Title", "Released", "Runtime", "Genre", "Director", "Writer", "Actors", "Plot", "Poster", "Metascore", "imdbRating"]
let keylength = keys.length;

function formatDate(dateString){
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

function pick(obj, keys){
  Object.fromEntries(keys.map(key => {
    let newkey = key;
    let value = obj[key];

    if (key === "Genre") newkey = "Genres";
    if (key === "Director") newkey = "Directors";
    if (key === "Writer") newkey = "Writers";

    if (key === "Actors" || key === "Genre" || key === "Director" || key === "Writers"){

    }
    if (key === "Released") value = formatDate(value);
    if (key === "Runtime" || "Metascore") value = parseint(value, 10); // 10 = decimal number
    if (key === "imdbRating") value = parseFloat(value, 10);
    return [newkey,value];
  }))
        
}

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for data..
app.get('/movies', function (req, res) {
  // Part 1: Remove the next line and replace with your code
  res.send(movies)
})

app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

