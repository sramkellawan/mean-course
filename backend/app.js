const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id: "adfadsf",
      title: "First Server Side Post",
      content: "This is coming from the Server",
    },
    {
      id: "123dfghd",
      title: "Second Server Side Post",
      content: "This is also coming from the Server",
    }
  ];
  res.status(200).json({
    message:'Posts fetched Successfully!',
    posts: posts
  });
});

module.exports = app;
