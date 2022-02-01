//All the server imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000
const sequelize = require('./database/sequelize')
const bcrypt = require('bcrypt');
const { connect } = require("./database/testConnection");
const  Sequelize = require("./database/sequelize")
require("dotenv").config();
const {CONNECTION_STRING} = process.env;

// Middleware
app.use(express.json());
app.use(cors());
// app.use(express.static(path.resolve(__dirname, "../build")))

//Endpoints
app.post("/register", async (req, res) => {
  const photos = null
  const {username, firstName, lastName, email, bio, DOB, photo, password } = req.body
  const checkUser = await sequelize.query(`
  SELECT * FROM registry WHERE username = '${username}'
  `)
  if(checkUser[1].rowCount !== 0) {
    res.status(500).send('Username already exists')
  } else {
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)
    sequelize.query(`
    INSERT INTO registry(username, firstname, lastname, email, bio, dob, photo, password)
    VALUES (
      '${username}',
      '${firstName}',
      '${lastName}',
      '${email}',
      '${bio}',
      '${DOB}',
      ${photos},
      '${passwordHash}'
    );
    `)
    .catch(err => (err.message))

    const userInfo  = await sequelize.query(`
      SELECT * FROM registry WHERE username = '${username}'
      `)
      console.log(userInfo[0])
      res.status(200).send(userInfo)
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  const validUser = await sequelize.query(`
    SELECT * FROM registry WHERE username = '${username}'
  `).catch(err => console.log(err))
  console.log(validUser)
  if(validUser[1].rowCount === 1) {
    if (bcrypt.compareSync(password, validUser[0][0].password)) {
      let object = {
        user_id: validUser[0][0].user_id,
        firstName: validUser[0][0].firstname,
        lastName: validUser[0][0].lastname,
        bio: validUser[0][0].bio,
        email: validUser[0][0].email,
        photo: validUser[0][0].photo,
        DOB: validUser[0][0].dob,
        username
      }
      res.status(200).send(object)
    } else {
      res.status(401).send("Password is incorrect")
    }
  } else {
      res.status(401).send("Username is incorrect")
  }
})
app.post('/api/additem', async (req, res) => {
  const {input, user_id} = req.body

const send = await sequelize.query(`
INSERT INTO grocery_items(item_names, user_id)
VALUES ('${input}', ${user_id});
`).catch(err => console.log(err))
const getList = await sequelize.query(`
SELECT * FROM grocery_items WHERE user_id = ${user_id}
ORDER BY ;
`).catch(err => console.log(err))

res.status(200).send(getList[0])
})

app.delete('/api/delete', async (req, res) => {
  console.log(req.body)  
  await sequelize.query(`
    DELETE from grocery_items
    WHERE item_id = ${req.body.item_id}
  `)
  .catch(err => console.log(err))
  const getList = await sequelize.query(`
SELECT * FROM grocery_items WHERE user_id = ${req.body.user_id};
`)
res.status(200).send(getList[0])

  // res.sendStatus(200)
})

app.get("/api/getitems/:user_id", (req, res) => {

  const { user_id } = req.params
  sequelize.query(`
  SELECT * FROM grocery_items WHERE user_id = ${user_id};
  `).then(data => res.status(200).send(data[0]))
})


// catch-all for the build environment, allowing it to run prooperly
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

connect()


//connection to port
// const { PORT } = process.env;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
