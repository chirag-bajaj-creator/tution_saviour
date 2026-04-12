const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const { getStats } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/stats', verifyJWT, getStats);

module.exports = router;
