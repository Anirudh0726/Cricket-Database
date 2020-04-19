const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    jerseyId:{
        type: Number
    },
    name:{
        type: String
    },
    dob:{
        type: Date
    },
    doj:{
        type: Date
    },
    team:{
        type: String
    },
});

const Player = module.exports = mongoose.model('Player',PlayerSchema);

module.exports.addPlayer = function(newPlayer, callback){
    newPlayer.save(callback);
}

module.exports.getPlayersByTeamName = function(team,callback){
    Player.find({team:team},callback);
}

module.exports.getPlayers = function(callback) {
    Player.find({},callback);
}