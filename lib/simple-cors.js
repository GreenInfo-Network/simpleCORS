"use strict";

var middleware = require("./middleware"),
  app = require("express")();

app.use(middleware.CORS);

app.use("/", require("./cors-proxy"));

module.exports = app;
