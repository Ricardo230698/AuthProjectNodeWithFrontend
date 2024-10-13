const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.use('/teams', ensureAuth, require('./teams'));
router.use('/', require('./swagger'));
router.use('/login', ensureGuest, require('./login'));
router.use('/dashboard', ensureAuth, require('./dashboard'));
router.use('/auth', require('./auth'));
// router.use('/logout', require('./logout'));

module.exports = router;