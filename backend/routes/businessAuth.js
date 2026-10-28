const express = require('express');
const {handleBusinessSignup,handleBusinessLogin} = require('../controllers/auth');
const router = express.Router();


router.post('/signup',handleBusinessSignup);
router.post('/login',handleBusinessLogin);


module.exports = router;
