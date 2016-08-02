"use strict";

var express = require("express"),
    request = require("request");

var dataSourceRoutes = require('./dataSourceRoutes.json');

var app = express();

app.get("/:data_source?", function(req, res) {
  // attempt to map the path to a data source;
  // if that fails, attempt to use the data source passed as a command-line argument.
  var host = dataSourceRoutes[req.params['data_source']];

  if (!host) {
    host = process.argv[2];
  }

  if (!host) {
    // still no data source found; 500.
    return res.status(500).send("Invalid data source:" + req.params["data_source"] +
      ". Specify a valid data source as the request path, e.g. 'http://simplecorshost:PORT/data_source/?foo=bar', " +
      "where `data_source` is either 1. Mapped to a URL in ./dataSourceRoutes.json, or " +
      "2. Supplied as the only command line argument to the program (e.g. `node server.js http://my-data-source.com/dataProvider.php`");
  }

  // valid data source URL determined; make the request.
  return request.get({
    uri: host,
    qs: req.query,
    json: true
  }).pipe(res);
});

module.exports = app;
