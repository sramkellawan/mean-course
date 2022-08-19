const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

post.save();

  res.status(201).json({message: 'Post added successfully'});
  next();
});

app.get('/api/posts',(req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched Successfully!",
      posts: documents
    });
  });


});

module.exports = app;
