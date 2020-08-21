const express = require('express');
const checkToken = require('../middlewares/checkToken')
const { check } = require('express-validator');

const movieController = require("../controllers/movies.controller");

const router = express.Router();
//all the api written below this will require a token
router.use(checkToken);

router.post('/create',movieController.createin);
router.get('/allMovies',movieController.getAllMovies);
module.exports = router;




