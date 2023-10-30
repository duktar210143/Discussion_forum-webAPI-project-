const express = require("express");
const jwt = require("jsonwebtoken");
const databaseConnection = require("./database/db");
const configureMiddleware = require("./middleware/middleware");
const {setUpMultMiddleWare} = require('./middleware/multer.middleware')
const app = express();
app.use("/uploads", express.static("uploads"));


// settingUp middlewares
configureMiddleware(app);

// database connection
databaseConnection();

// setup Multer middle ware
const multerMiddleWare = setUpMultMiddleWare();

// post request to register user
app.use("/api", require("./Routes/SignUpRoute"));
// get request to handle login
app.use("/api", require("./Routes/LoginRoute"));

// post route for uploading image using multer and profileController
app.use("/api",multerMiddleWare, require("./Routes/ProfileRoutes"))

// Get route for fetching image from the server
app.use("/api", require("./Routes/ProfileRoutes"));

// Set question route for posting the questions
app.use("/api",require("./Routes/QuestionsRoute"))

// Get question route for plotting the questions on screen
app.use("/api/getQuestions",require("./Routes/QuestionsRoute"))

app.listen(1337, () => {
  console.log("server started on 1337");
});
