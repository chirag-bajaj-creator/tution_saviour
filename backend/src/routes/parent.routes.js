const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { getSummary, getChild, getFees, getAttendance, getPerformance, linkStudent, searchStudents } = require('../controllers/parentController');

const router = express.Router();

router.get('/summary', verifyJWT, checkRole('parent'), getSummary);
router.get('/child', verifyJWT, checkRole('parent'), getChild);
router.get('/fees', verifyJWT, checkRole('parent'), getFees);
router.get('/attendance', verifyJWT, checkRole('parent'), getAttendance);
router.get('/performance', verifyJWT, checkRole('parent'), getPerformance);
router.post('/setup', verifyJWT, checkRole('parent'), linkStudent);
router.get('/search-students', verifyJWT, checkRole('parent'), searchStudents);

module.exports = router;
