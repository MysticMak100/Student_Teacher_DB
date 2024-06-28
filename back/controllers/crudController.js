import mongoose from "mongoose";

const Student = mongoose.model("studentinfo");
const Teacher = mongoose.model("teacherinfo");

//Adding student
export const add_student = async (req, res) => {
  const { name, fname, roll, classs, phnum, addresss } = req.body;
  try {
    await Student.create({
      type: "student",
      name,
      fname,
      roll,
      classs,
      phnum,
      addresss,
    });
    res.send({ status: "student added" });
  } catch (error) {
    res.send({ status: "something wrong occured" });
  }
};

//Adding teacher
export const add_teacher = async (req, res) => {
  const { name, subject, classs, ph, addresss } = req.body;

  try {
    await Teacher.create({
      type: "teacher",
      name,
      subject,
      classs,
      ph,
      addresss,
    });

    res.send({ status: "teacher added" });
  } catch (error) {
    res.send({ status: "something wrong occured" });
  }
};

//Edit-Verify Teacher by ID
export const edit_teacher_get = async (req, res) => {
  const { id } = req.params;
  try {
    const dt = await Teacher.findOne({ _id: id });
    res.status(200).json(dt);
  } catch (error) {
    res.status(404).json({ message: "teacher not found" });
  }
};

//Edit-Update Teacher by ID
export const edit_teacher_put = async (req, res) => {
  const { id } = req.params;
  try {
    await Teacher.updateOne({ _id: id }, req.body);
    res.send({ status: "Teacher updated" });
  } catch (error) {
    console.log("Error while changing teacher", error);
  }
};

//Edit-Verify Student by ID
export const edit_student_get = async (req, res) => {
  const { id } = req.params;
  try {
    const dt = await Student.findOne({ _id: id });
    res.status(200).json(dt);
  } catch (error) {
    res.status(404).json({ message: "student not found" });
  }
};

//Edit-Update Student by ID
export const edit_student_put = async (req, res) => {
  const { id } = req.params;
  try {
    await Student.updateOne({ _id: id }, req.body);
    res.send({ status: "Student updated" });
  } catch (error) {
    console.log("Error while changing student", error);
  }
};

//Delete Teacher by ID
export const delete_teachers = async (req, res) => {
  try {
    await Teacher.deleteOne({ _id: req.params.id });
    res.send({ status: "teacher deleted" });
  } catch (error) {
    console.log("error while deleting teacher", error);
  }
};

//Delete Student by ID
export const delete_students = async (req, res) => {
  try {
    await Student.deleteOne({ _id: req.params.id });
    res.send({ status: "student deleted" });
  } catch (error) {
    console.log("error while deleting student", error);
  }
};

//Get Student data from database
export const get_students = async (req, res) => {
  try {
    const dt = await Student.find({});
    res.status(200).json(dt);
    console.log(dt);
  } catch (error) {
    console.log("error");
    res.status(404).json({ message: "student not found" });
  }
};

//Get teacher data by database
export const get_teachers = async (req, res) => {
  try {
    const dt = await Teacher.find({});
    res.status(200).json(dt);
  } catch (error) {
    res.status(404).json({ message: "teacher not found" });
  }
};
