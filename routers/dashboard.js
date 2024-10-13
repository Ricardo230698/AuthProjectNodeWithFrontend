const express = require('express');
const router = express.Router();
// We bring our Team model
const Team = require('../models/Team');

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({ user: req.user.id }).lean()
        console.log(teams);
        res.render('dashboard', {
            name: req.user.firstName,
            teams
        });
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
});

module.exports = router;