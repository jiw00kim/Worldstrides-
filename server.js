const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
// app.get('/login', function(_request, await)
// {
//   await.send("Here is a sign-in page");

// });

// app.get('/createUser', function(request, await)
// {
//   await.sendDate("./db/conn");
// });

// app.get('*', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});