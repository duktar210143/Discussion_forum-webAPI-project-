const express = require('express');
const cors = require("cors");

const configureMiddleware = (app) => {
  app.use(express.json());
  app.use(cors());
};

module.exports = configureMiddleware;
