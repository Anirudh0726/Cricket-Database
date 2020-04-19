const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
    name:{
        type: String
    },
    rank:{
        type: Number
    },
    color:{
        type: String
    },
    captain:{
        type:String
    },
    worldCups:{
        type: Number
    }
});

const Team = module.exports = mongoose.model('Team',TeamSchema);

module.exports.addTeam = function(newTeam, callback){
    newTeam.save(callback);
}

module.exports.getTeams = function(callback){
    Team.find({},callback);
}
