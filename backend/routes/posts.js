const express = require('express');
const { createPost, getPosts, getPostById, votePost } = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', auth, createPost);
router.post('/:id/vote', auth, votePost);

module.exports = router;
