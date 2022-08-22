const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Post = require('./models/posts');
const postsRoutes = require('./routes/posts');

const { createShorthandPropertyAssignment } = require('typescript');

const app = express();

mongoose.connect(
  "mongodb+srv://Sean:DnJoes7boxFT1hCn@atlascluster.liuynlg.mongodb.net/node-angular?retryWrites=true&w=majority").then(() =>{
    console.log('Connected to MongoDB');
  })
  .catch(() => {
    console.log("NOT connected to MongoDB");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
})

app.use("/api/posts", postsRoutes);

module.exports = app;
