"use strict"
const HttpResponse = require('../models/http-response');
const Movie = require('../models/movie');

//the below function to create a movie
const createin = async (req, res) => {
  const {userId,name,img,summary} = req.body;
  const createdMovie = new Movie({
    name,
    img,
    summary,
    ownerId:userId,
    createdBy:userId,
    updatedBy:userId
  });
  try {
    await createdMovie.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }
  console.log(createdMovie);
  res.status(201).json({
    name:createdMovie.name,
    img: createdMovie.img,
    summary: createdMovie.summary
  });
};

//below function to get all movies

const getAllMovies = async (req, res) => {
  let fetchedMovies;

  try {
    fetchedMovies = await Movie.find({},'name img summary -_id');
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }
  res.status(201).json(
    fetchedMovies
);
};

exports.createin = createin;
exports.getAllMovies = getAllMovies;
