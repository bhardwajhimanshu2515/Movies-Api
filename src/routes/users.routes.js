const express = require('express');
const checkToken = require('../middlewares/checkToken')
const { check } = require('express-validator');

const usersController = require("../controllers/users.controller");


const router = express.Router();

router.post('/signup',  
[
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  usersController.singin);

router.post('/login', usersController.login);

//all the api written below this will require a token
router.use(checkToken);


module.exports = router;


