const User = require('../models/user')

const handleGetAllUsers = async (req, res) => {
  const allUser = await User.find({});

  res.setHeader("X-MyName", "Jay Patel"); // Custom Header
  return res.json(allUser);
}

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }
  return res.json(user);
}

const handleUserCreation = async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ status: "All fields are req..." })
  }

  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  })

  return res.status(200).json({ status: "success" });
}

const handleUpdateUserById = async (req, res) => {
  const newData = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    jobTitle: req.body.job_title,
  };;

  console.log(newData);
  
  const user = await User.findByIdAndUpdate(req.params.id, newData);
  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }
  return res.status(201).json({ status: "Successfully updated"});
}

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ status: "success" });
}


module.exports = { 
  handleGetAllUsers,
  handleGetUserById,
  handleUserCreation,
  handleUpdateUserById,
  handleDeleteUserById
}