const ParentAccess = require('../models/ParentAccess');

const scopeToChild = async (req, res, next) => {
  try {
    const parentAccess = await ParentAccess.findOne({
      userId: req.user.id,
      studentId: req.params.studentId || req.body.studentId,
    });
    if (!parentAccess) return res.status(403).json({ error: 'Access denied' });
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = scopeToChild;
