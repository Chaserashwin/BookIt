const express = require("express");
const { Experience } = require("../models/experience");
const experienceRouter = express.Router();

//getting all the experiences
experienceRouter.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find({});
    res.send(experiences);
  } catch (error) {
    res.status(400).send("Something went wrong!!");
  }
});

//getting the experience based on id
experienceRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const experiencebyId = await Experience.findOne({ id: id });
    console.log(experiencebyId);
    res.send(experiencebyId);
  } catch (error) {
    res.status(400).send("Something went wrong!!");
  }
});

//adding experiences
experienceRouter.post("/add", async (req, res) => {
  const experience = new Experience(req.body);
  console.log(experience);
  try {
    await experience.save();
    res.send("Experience added successfully");
  } catch (error) {
    res.status(400).send("Error in saving the experience:" + error.message);
  }
});

module.exports = experienceRouter;
