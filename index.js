const express = require('express');
const users = require('../Project-01/mock-data.json')
const fs = require('fs');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;;

const app = express();

// Connection to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo Err: ', err));

// Schema - 1st step
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  }
},
{ timestamps: true }
);

// Model - 2nd step
const User = mongoose.model('user', userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

app.get('/users', async (req, res) => {
  const allUser = await User.find({}); // find({}) means all the entries

  const html = `
  <ul>
    ${allUser.map((user) => `<li> ${user.firstName} - ${user.email} </li>`).join("")}
  </ul>
  `
  res.send(html);
})

app.get("/api/users", async (req, res) => {
  const allUser = await User.find({});

  res.setHeader("X-MyName", "Jay Patel"); // Custom Header
  return res.json(allUser);
})

app.get('/api/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).json({ error: "user not found" })
  }
  return res.json(user);
})

app.post('/api/user', async (req, res) => {
  const body = req.body;
  // console.log(body); // it will give undefined without using middleware
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
})

app.patch('/api/user/:id', async (req, res) => {
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
})

app.delete('/api/user/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  return res.status(200).json({ status: "success" })
})

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
