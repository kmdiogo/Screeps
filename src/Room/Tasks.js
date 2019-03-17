var Helpers = require('../Util/Helpers');
var CONSTANTS = require('CONSTANTS');
module.exports = {
    ConstructionSiteHandler: function() {
        for (var site in Game.constructionSites)
        {
            let curRoom = Game.constructionSites[site].room.name;
            if (Helpers.CreepList(['builder'],[curRoom]).length == 0){
                let creepName = "builder" + Game.time;
                let nearestSpawn = Helpers.FindClosestStructure(Game.constructionSites[site],[STRUCTURE_SPAWN]);
                nearestSpawn.spawnCreep(CONSTANTS.BUILDER_BODY, creepName, {memory: {role: 'builder'}});
                console.log("Spawning new builder: '" + creepName + "'");
            }
        }
    }

};