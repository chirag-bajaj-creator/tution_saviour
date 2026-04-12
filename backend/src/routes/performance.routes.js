const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { create, get } = require('../controllers/performanceController');

const router = express.Router();

router.post('/', verifyJWT, checkRole('tutor'), create);
router.get('/', verifyJWT, checkRole('tutor'), get);

module.exports = router;
