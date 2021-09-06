const express = require('express');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const app = express();

mongoose.connect(
  "mongodb+srv://nguyentanvinh7a:"+ process.env.MONGO_ATLAS_PW + "@cluster0.ebrk4.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
)
  .then(() => { console.log('Connected to database!') })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST,GET,PUT,PATCH,DELETE,OPTIONS'
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
