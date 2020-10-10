const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    history: {
        type: [{
            squares: {
                type: Array,
                default: []
            }
        }]
    },
    enabled: {
        type: Boolean,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    stepnumber: {
        type: Number,
        required: true
    },
    xisnext: {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;