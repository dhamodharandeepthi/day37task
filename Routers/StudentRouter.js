const express = require("express");
const { mongoose } = require("mongoose");
const Student = require("../models/StudentModel");

const studentRouter = express.Router();

studentRouter.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

studentRouter.post("/", async (req, res) => {
  const addStudent = new Student({
    name: req.body.name,
    batch: req.body.batch,
    mentor: req.body.mentor ? req.body.mentor : undefined,
  });
  try {
    const newStudent = await addStudent.save();
    res.send(newStudent);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});
/*  List of students with no mentors */

studentRouter.get("/no-mentors", async (req, res) => {
  const students = await Student.find({ mentor: undefined });
  res.send(students);
});

/* Assign or change Mentor for Student -- select one student and assign one mentor */

studentRouter.patch("/assign-mentor/:id", async (req, res) => {
  const { id } = req.params;
  const { mentor } = req.body;
  try {
    const student = await Student.findById(id);
    student.mentor = mentor;
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

/* select one mentor and add to multiple students */

studentRouter.patch("/assign-mentor-students", async (req, res) => {
  const { mentor, stud_list } = req.body;
  console.log(stud_list);
  try {
    stud_list.map(async (stud_id) => {
      const student = await Student.findById(stud_id);
      student.mentor = mentor;
      await student.save();
    });
    res.send("Updated Successfully");
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

/* show all students for a particular mentor */

studentRouter.get("/mentor-students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find({ mentor: id });
    res.send(students);
  } catch (err) {
    res.send(err);
  }
});

module.exports = studentRouter;
