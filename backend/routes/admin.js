const express = require('express');
const { getStats, approvePost, rejectPost, banUser } = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { checkRole, checkPermission } = require('../middleware/rbac');

const router = express.Router();

// All admin routes require authentication and at least MODERATOR role
router.use(auth);
router.use(checkRole(['MODERATOR', 'ADMIN', 'SUPER_ADMIN']));

router.get('/stats', getStats);
router.post('/posts/:id/approve', checkPermission('canApprovePosts'), approvePost);
router.post('/posts/:id/reject', checkPermission('canApprovePosts'), rejectPost);
router.post('/users/:id/ban', checkPermission('canBanUsers'), banUser);

module.exports = router;
