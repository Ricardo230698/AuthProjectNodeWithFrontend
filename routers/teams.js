const express = require('express');
const router = express.Router();

const teamsController = require('../controllers/teams');
const validation = require('../middleware/validate');

router.get('/add', teamsController.addTeam);

router.post('/', validation.saveTeam, teamsController.createNewTeam);

router.get('/edit/:id', teamsController.getTeamByIdAndEdit);

router.put('/:id', validation.saveTeam, teamsController.updateTeam);

router.delete('/:id', teamsController.deleteTeam);

router.get('/:id', teamsController.getTeamById);

// router.get('/', teamsController.getAllTeams);

// router.get('/:id', teamsController.getTeamById);

// router.post('/', validation.saveTeam, teamsController.createNewTeam);

// router.put('/:id', validation.saveTeam, teamsController.updateTeam);

// router.delete('/:id', teamsController.deleteTeam);

module.exports = router;