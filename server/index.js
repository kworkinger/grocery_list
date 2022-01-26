//All the server imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000
const sequelize = require('./database/sequelize')
const bcrypt = require('bcrypt');
const { connect } = require("./database/testConnection");
const { Sequelize } = require("sequelize/dist");

require("dotenv").config();
const {CONNECTION_STRING} = process.env;

// Middleware
app.use(express.json());
app.use(cors());
// app.use(express.static(path.resolve(__dirname, "../build")))

//Endpoints
app.post("/register", async (req, res) => {
  const {username, firstName, lastName, email, bio, DOB, photo, password } = req.body
  const checkUser = await sequelize.query(`
  SELECT * FROM users WHERE username = '${username}'
  `)
  if(checkUser[1].rowCount !== 0) {
    res.status(500).send('Username already exists')
  } else {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    await sequelize.query(`
    INSERT INTO users(username, firstName, lastName, email, bio, DOB, photo, password)
    VALUES (
      '${firstName}',
      '${lastName}',
      '${username},
      '${email}',
      '${bio}',
      '${DOB}',
      '${photo}',
      '${passwordHash}'
    )
    `)
    const userInfo  = await sequelize.query(`
      SELECT id, username, firstName, lastName, email, bio, DOB, photo FROM users WHERE username = '${username}'
      `)
      res.status(200).send(userInfo)
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const validUser = await sequelize.query(`
    SELECT * FROM users WHERE username = '${username}'
  `)
  if(validUser[1].rowCount === 1) {
    if (bcrypt.compareSync(password, validUser[0][0].password)) {
      let authorized = {
        id: validUser[0][0].id,
        firstName: validUser[0][0].firstName,
        lastName: validUser[0][0].lastName,
        username: validUser[0][0].username,
        bio: validUser[0][0].bio,
        email: validUser[0][0].email,
        photo: validUser[0][0].photo,
        DOB: validUser[0][0].DOB
      }
      res.status(200).send(object)
    } else {
      res.status(401).send("Password is incorrect")
    }
  } else {
      res.status(401).send("Username is incorrect")
  }
})


// catch-all for the build environment, allowing it to run prooperly
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

connect()


//connection to port
// const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
