const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const checkRole = require('../middleware/checkRole');
const { upload } = require('../services/cloudinary');
const { list, create, update, remove } = require('../controllers/studentsController');

const router = express.Router();

router.get('/', verifyJWT, checkRole('tutor'), list);
router.post('/', verifyJWT, checkRole('tutor'), upload.single('photo'), create);
router.put('/:id', verifyJWT, checkRole('tutor'), update);
router.delete('/:id', verifyJWT, checkRole('tutor'), remove);

module.exports = router;
