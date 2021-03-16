const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
