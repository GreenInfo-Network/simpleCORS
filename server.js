"use strict";

var app = require("express")(),
	compression = require("compression");

app.use(compression());

app.use(require("./index"));

app.listen(process.env.PORT || 5001, function() {
  console.log("Listening on http://%s:%d/", this.address().address, this.address().port);
});
