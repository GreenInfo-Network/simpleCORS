"use strict";

var compression = require("compression"),
		cors = require("cors"),
		express = require("express");

var app = express();

app.use(compression());
app.use(cors());
app.use(require("./index"));

app.listen(process.env.PORT || 5001, function() {
  console.log("Listening on http://%s:%d/", this.address().address, this.address().port);
});
