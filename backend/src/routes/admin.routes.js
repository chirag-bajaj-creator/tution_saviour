const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { getTeachers, updateTeacherStatus, getStats } = require('../controllers/adminController');

const router = express.Router();

router.get('/teachers', verifyJWT, checkRole('admin'), getTeachers);
router.put('/teachers/:id/status', verifyJWT, checkRole('admin'), updateTeacherStatus);
router.get('/stats', verifyJWT, checkRole('admin'), getStats);

module.exports = router;
