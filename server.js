var express = require("express"),
  config = require("./server/configure"),
  path = require("path"),
  app = express(),
  mongoose = require("mongoose");

app.set("port", process.env.PORT || 3300);
app.set("views", path.join(__dirname, "views"));
app = config(app);

mongoose.connect("mongodb://localhost/imgUpload", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("open", function () {
  console.log("Mongoose Connected Successfully!");
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err.message.red);
  });

var server = app.listen(app.get("port"), function () {
  console.log("Server up: http://localhost:" + app.get("port"));
});
