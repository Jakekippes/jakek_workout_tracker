const { Workout } = require("../models");
const db = require("../models");

module.exports = (app) => {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({}).then((data) => {
      res.json(data);
    });
  });
  app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    const workout = req.body;

    Workout.findByIdAndUpdate(
      id,
      { $push: { exercises: workout } },
      { new: true }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
