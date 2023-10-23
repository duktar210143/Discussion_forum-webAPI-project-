const express = require("express");
const jwt = require("jsonwebtoken");
const databaseConnection = require("./database/db");
const configureMiddleware = require("./middleware/middleware");

const app = express();

// settingUp middlewares
configureMiddleware(app);

// database connection
databaseConnection();

// post request to register user
app.use("/api", require("./routes/signUpRoute"));
// get request to handle login
app.use("/api", require("./routes/loginRoute"));

app.listen(1337, () => {
  console.log("server started on 1337");
});
