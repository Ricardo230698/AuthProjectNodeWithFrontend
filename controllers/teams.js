// Importing the database connection
// const mongodb = require('../connectionDB/mongodb');
// const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');
// const { BSONError } = require('bson');
const Team = require('../models/Team');

// New routes added for OAuth assignment
const addTeam = (req, res, next) => {
    try {
        res.render('teams/add');
    } catch (error) {
        console.error(error);
        res.render('error/500');
    }
}

const createNewTeam = async (req, res, next) => {

    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new team.',
            schema: {
                name: 'any',
                foundationDate: 'April 28 1929',
                website: 'https://any.com/',
                nationalCups: 0,
                internationalCups: 0,
                stadiumName: 'any',
                city: 'any'
            }
    } */
    
    try {
        // const result = await mongodb.getDb().db('Sports').collection('teams').insertOne( req.body );        
        // if (result.acknowledged) {
        //     res.status(201).json(result);
        // }
        req.body.user = req.user.id;
        await Team.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        // console.log(error.message);
        // if (error.name === 'ValidationError') {
        //     next(createError(422, error.message));
        // }
        // next(error);
        console.error(error);
        res.render('error/500');
    }
}

const getTeamByIdAndEdit = async (req, res, next) => {    
    // const teamId = new ObjectId(req.params.id);

    // if(!ObjectId.isValid(teamId)) {
    //     res.status(400).json('You should try with a valid team ID');
    // }

    try {
        const team = await Team.findOne({ _id: req.params.id }).lean();

        // const result = await mongodb.getDb().db('Sports').collection('teams').findOne( { _id: teamId } );
        if(!team) {
            // throw createError(404, 'ID does not exist. Try another one');
            return res.render('error/404');
        }

        if (team.user != req.user.id) {
            res.redirect('/dashboard');
        } else {
            res.render('teams/edit', {
                team
            })
        }
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(result);
    } catch (error) {
        // console.log(error.message);
        // if(BSONError.isBSONError(error)) {
        //     next(createError(400, 'Invalid ID'));
        //     // next(new BSONError(error.message));
        //     return;
        // }

        // next(error);
        return res.render('error/500');
    }
}

const updateTeam = async (req, res, next) => {

    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new team.',
            schema: {
                name: 'any',
                foundationDate: 'April 28 1929',
                website: 'https://any.com/',
                nationalCups: 0,
                internationalCups: 0,
                stadiumName: 'any',
                city: 'any'
            }
    } */

    try {
        let team = await Team.findById(req.params.id).lean();
        if(!team) {
            return res.render('error/404');
        }
        if (team.user != req.user.id) {
            res.redirect('/dashboard');
        } else {
            team = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard');
            
        }

    } catch (error) {
        console.log(error);
        return res.render('error/500');
    }
}

const deleteTeam = async (req, res, next) => {
    try {
        await Team.remove({ _id: req.params.id })
        // if(result.deletedCount == 0) {
        //     throw createError(404, 'ID does not exist. Try another one');
        // }
        // console.log(result);
        // res.status(204).send();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error.message);
        return res.render('error/500');
    }
}

const getTeamById = async (req, res, next) => {    
    // const teamId = new ObjectId(req.params.id);

    // if(!ObjectId.isValid(teamId)) {
    //     res.status(400).json('You should try with a valid team ID');
    // }

    try {
        const team = await Team.findOne({ _id: req.params.id }).lean();

        // const result = await mongodb.getDb().db('Sports').collection('teams').findOne( { _id: teamId } );
        if(!team) {
            // throw createError(404, 'ID does not exist. Try another one');
            return res.render('error/404');
        }

        if (team.user != req.user.id) {
            res.redirect('/dashboard');
        } else {
            res.render('teams/single', {
                team
            })
            // res.json(team);
        }
        // res.setHeader('Content-Type', 'application/json');
        // res.status(200).json(result);
    } catch (error) {
        // console.log(error.message);
        // if(BSONError.isBSONError(error)) {
        //     next(createError(400, 'Invalid ID'));
        //     // next(new BSONError(error.message));
        //     return;
        // }

        // next(error);
        return res.render('error/500');
    }
}


// -------------------------------------------------------

const getAllTeams = async (req, res, next) => {
    try {
        const result = await mongodb.getDb().db('Sports').collection('teams').find();
        result.toArray().then(
            (lists) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
            }
        )
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}


module.exports = {
    addTeam,
    getAllTeams,
    getTeamByIdAndEdit,
    createNewTeam,
    updateTeam,
    deleteTeam,
    getTeamById
}
