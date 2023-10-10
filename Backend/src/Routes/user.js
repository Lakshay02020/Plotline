const express = require('express')
const { handleUserSignup, handleUserLogin } = require('../Controllers/user')

const router = express.Router();
router.post('/signup', handleUserSignup);
router.post('/login', handleUserLogin);
module.exports = router;