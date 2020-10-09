const gameRouter = require('express').Router();
const Game = require('../models/gameModel');

gameRouter.route('/')
.get((req, res) => {
    Game.find()
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

module.exports = gameRouter;