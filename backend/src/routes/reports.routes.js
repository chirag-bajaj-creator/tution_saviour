const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const { getStudentReport } = require('../controllers/reportController');

const router = express.Router();

router.get('/:studentId', verifyJWT, getStudentReport);

module.exports = router;
