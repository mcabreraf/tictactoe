const gameRouter = require('express').Router();
const Game = require('../models/gameModel');

gameRouter.route('/')
.get((req, res) => {
    Game.find()
    .populate('history')
    .then(games => res.json(games))
    .catch(err => res.status(400).json('Error: '+err))
})
.post((req, res) => {
    const history = req.body.history;
    const enabled = req.body.enabled;
    const finished = req.body.finished;
    const stepnumber = req.body.stepnumber;
    const xisnext = req.body.xisnext;

    const newGame = new Game({
        history,
        enabled,
        finished,
        stepnumber,
        xisnext
    });

    newGame.save()
    .then(() => res.json('Game added!'))
    .catch(err => res.status(400).json('Error: '+err))
})

gameRouter.route('/:id')
.get((req, res) => {
    Game.findById(req.params.id)
    .then(game => res.json(game))
    .catch(err => res.status(400).json('Error: '+err))
})
.put((req, res) => {
    Game.findByIdAndUpdate(req.params.id, {$set: {
        history: req.body.history,
        enabled: req.body.enabled,
        finished: req.body.finished,
        stepnumber: req.body.stepnumber,
        xisnext: req.body.xisnext
    }})
    .then(game => 
           Game.findById(game._id)
           .populate('history')
           .then(game => {
                res.statusCode = 200;
                res.json(game);
           }) 
        )
    .catch(err => res.status(400).json('Error: '+err))
})

module.exports = gameRouter;