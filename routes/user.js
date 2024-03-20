const express = require('express');
const { 
  handleGetAllUsers, 
  handleGetUserById,
  handleUserCreation,
  handleUpdateUserById,
  handleDeleteUserById
} = require('../controllers/user')

const router = express.Router();

router.get("/", handleGetAllUsers)

router.get('/:id', handleGetUserById)

router.post('/', handleUserCreation)

router.patch('/:id', handleUpdateUserById)

router.delete('/:id', handleDeleteUserById)

module.exports = router;