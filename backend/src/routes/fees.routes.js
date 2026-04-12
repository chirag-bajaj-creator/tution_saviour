const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { list, create, update } = require('../controllers/feesController');

const router = express.Router();

router.get('/', verifyJWT, checkRole('tutor'), list);
router.post('/', verifyJWT, checkRole('tutor'), create);
router.put('/:id', verifyJWT, checkRole('tutor'), update);

module.exports = router;
