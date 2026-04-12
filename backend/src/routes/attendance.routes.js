const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { mark, get } = require('../controllers/attendanceController');

const router = express.Router();

router.post('/', verifyJWT, checkRole('tutor'), mark);
router.get('/', verifyJWT, checkRole('tutor'), get);

module.exports = router;
