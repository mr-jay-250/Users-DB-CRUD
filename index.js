const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/user');
const { connectMongoDb } = require('./connection');
const { logReqRes } = require('./middlewares');

const PORT = process.env.PORT || 3000;;

const app = express();

// Connection to MongoDB
connectMongoDb(process.env.DB_URL).then(() => {
  console.log("MongoDB connected!");
})

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))
app.use(logReqRes('logs.txt')) // Middleware - Custom

// Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
