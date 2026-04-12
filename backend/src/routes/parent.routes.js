const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { getSummary, linkStudent, searchStudents } = require('../controllers/parentController');

const router = express.Router();

router.get('/summary', verifyJWT, checkRole('parent'), getSummary);
router.post('/setup', verifyJWT, checkRole('parent'), linkStudent);
router.get('/search-students', verifyJWT, checkRole('parent'), searchStudents);

module.exports = router;
