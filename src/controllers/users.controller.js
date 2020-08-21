"use strict"
const { validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpResponse = require('../models/http-response');
const User = require('../models/user');

const signup = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new HttpResponse('Invalid inputs passed, please check your data.', 422)
  //   res.json({ response: error })
  // }
  console.log(req.body)
  const { name,phoneNumber, email, password,position,salary,TopSkill,userDept } = req.body;
  // checking if user already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpResponse(
      'Signing up failed, Something went wrong while checking existing user',
      500
    );
    return res.status(500).json({ response: error });
  }

  if (existingUser) {
    const error = new HttpResponse(
      'User exists already, please login instead.',
      422
    );
    return res.status(422).json({ response: error });
  }

  //creating a hashed password and saving the user into mongo.
  let hashedPassword;
  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpResponse("Hashing Failed ..", 500)
    return res.status(500).json({ response: error });
  }
  const createdUser = new User({
    name,
    phoneNumber,
    email,
    password: hashedPassword,
    position,
    salary,
    TopSkill,
    userDept
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err)
    const error = new HttpResponse(
      err,
      500
    );
    return res.status(500).json({ response: error })
  }

  //generating JWT TOKEN- DO NOT TOUCH
  let token;
  try {
    token = jwt.sign({ userId: createdUser.id, email: createdUser.email, userType: createdUser.userType },
      "my toKen",
      { expiresIn: '1h' });
  } catch (err) {
    const error = new HttpResponse(
      "Token generation failed, Login not done",
      500
    );
    return res.status(500).json({ response: error });
  }


  res.status(201).json({
    userId: createdUser.id,
    phoneNumber:createdUser.phoneNumber,
    email: createdUser.email,
    position:createdUser.position,
    salary:createdUser.salary,
    TopSkill:createdUser.TopSkill,
    token: token,
    userDept:createdUser.userDept
  });
};


// LOGIN FUNCTION
const login = async (req, res) => {
  const { email, password } = req.body;

  //trying to find if user email exists.
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email })
  } catch (err) {
    const error = new HttpResponse(
      'Something went wrong while checking user email',
      500
    );
    return res.status(500).json({ response: error })
  }

  if (!existingUser) {
    const error = new HttpResponse(
      'Invalid credentials, could not log you in.',
      401
    );
    return res.status(500).json({ response: error })
  }
  let isValidPassword;
  try {
    isValidPassword = await bycrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpResponse('Something went wrong while comparing passwords', 500);
    return res.status(500).json({ response: error })
  }

  if (!isValidPassword) {
    const error = new HttpResponse('Wrong password entered', 401);
    return res.status(401).json({ response: error });
  }

  //generating JWT TOKEN- DO NOT TOUCH
  let token;
  try {
    token = jwt.sign({ userId: existingUser.id, email: existingUser.email, userType: existingUser.userType },
      "my toKen",
      { expiresIn: '1h' });
  } catch (err) {
    const error = new HttpResponse(
      "Token generation failed, Login not done",
      500
    );
    return res.status(500).json({ response: error });
  }
  console.log(existingUser);
  res.json({
    userId: existingUser.id,
    phoneNumber:existingUser.phoneNumber,
    email: existingUser.email,
    position:existingUser.position,
    salary:existingUser.salary,
    TopSkill:existingUser.TopSkill,
    token: token,
    userDept:existingUser.userDept
  });
  console.log(token);
};

exports.singin = signup;
exports.login = login;
