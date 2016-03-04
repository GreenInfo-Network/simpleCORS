"use strict";

var APIClient = require("./api_client"),
  middleware = require("./middleware"),
  app = require("express")(),
  dataSourceRoutes = require('../dataSourceRoutes.json');

app.get("/:data_source?", function(req, res) {

  // attempt to map the path to a data source;
  // if that fails, attempt to use the data source passed as a command-line argument.
  var host = dataSourceRoutes[req.params['data_source']];
  if (!host) {
    host = process.argv[2];
  }

  if (!host) {

    // still no data source found; 500.
    res.status(500).send("Invalid data source:" + req.params["data_source"] +
      ". Specify a valid data source as the request path, e.g. 'http://simplecorshost:PORT/data_source/?foo=bar', " +
      "where `data_source` is either 1. Mapped to a URL in ./dataSourceRoutes.json, or " +
      "2. Supplied as the only command line argument to the program (e.g. `node server.js http://my-data-source.com/dataProvider.php`");

  } else {

    // valid data source URL determined; make the request.
    
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

  }

});

module.exports = app;
