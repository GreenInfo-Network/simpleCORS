"use strict";

var APIClient = require("./api_client"),
  middleware = require("./middleware"),
  app = require("express")();

app.get("/", function(req, res) {

  var host = process.argv[2];
  var url = host + "?" + req.url.split('?')[1];
  var useCache = false;

  APIClient.GET(url, useCache, function(err, data, rsp) {

    // TODO stream data back
    
    if (useCache) {
      // TODO increase this (this can be effectively infinite once any kinks
      // are worked out)
      res.header("Cache-Control", "max-age=3600");
    }

    res.contentType("application/json");
    res.send(data);

  });

});

module.exports = app;
