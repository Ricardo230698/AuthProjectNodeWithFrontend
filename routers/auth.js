const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }), (req, res,) => {
    /*
        #swagger.security = [{
            "OAuth2": [
                'read', 
                'write'
            ]
        }] 
    */
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {

    /*
        #swagger.security = [{
            "OAuth2": [
                'read', 
                'write'
            ]
        }] 
    */

    res.redirect('/dashboard');
})

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/login')
    })
  })

module.exports = router;