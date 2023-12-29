const express = require("express");
const mongoose = require("mongoose");
const mentorRouter = require("./Routers/MentorRouter");
const studentRouter = require("./Routers/StudentRouter");

const app = express();
app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Assign Mentor app!");
});

app.use("/Mentors", mentorRouter);
app.use("/Students", studentRouter);

app.listen(PORT, () => {
  console.log("server started");
});
