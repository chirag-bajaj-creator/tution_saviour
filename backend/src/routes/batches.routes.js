const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { list, create } = require('../controllers/batchesController');

const router = express.Router();

router.get('/', verifyJWT, checkRole('tutor'), list);
router.post('/', verifyJWT, checkRole('tutor'), create);

module.exports = router;
