const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    req.logout();
    res.redirect('/');
    // res.redirect('/login');

});

module.exports = router;