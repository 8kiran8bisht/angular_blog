//for Angular deploy to keroku【'dist/web422-a6/'=>"public"】
var express = require("express");
var app = express();

app.use(express.static('./dist/web422-a6'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', {
    root: 'dist/web422-a6/'
  });
});

HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT, () => {
  console.log(`server listening on: ${HTTP_PORT}`);
});


// //for react deploy to keroku【'dist/web422-a6/'=>"public"】
// const express = require("express");
// const path = require("path");
// const app = express();

// const HTTP_PORT = process.env.PORT || 3000;

// app.use(express.static("public"));

// app.use((req,res,next)=>{
// //   res.sendFile(path.join(__dirname, "/public/index.html"));
//   res.sendFile('index.html', {root: 'public/'});
// });

// app.listen(HTTP_PORT, ()=>{
//     console.log(`server listening on: ${HTTP_PORT}`);
// });
