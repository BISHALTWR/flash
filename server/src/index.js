const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// console.log('Serving static files from', path.join(__dirname, '../uploads'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

require("dotenv").config();
const userRoute = require("./routes/users");
const connection = require("./db/connection");
const Challenge = require('./models/challenge');
const defaultChallenges = require('./db/defaultChallenges');

async function populateDBWithDefaultValues() {
  const count = await Challenge.countDocuments();

  if (count === 0) {
    for (let challenge of defaultChallenges) {
      const newChallenge = new Challenge(challenge);
      await newChallenge.save();
    }
  }
}

connection().then(() => {
  populateDBWithDefaultValues();
}).catch(error => {
  console.log('Connection failed!');
  console.log(error);
});


const port = process.env.PORT;
app.use(userRoute);
// console.log = console.trace;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
