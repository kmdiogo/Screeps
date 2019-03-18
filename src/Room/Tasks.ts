import Helpers from 'Utils/Helpers'
import CONSTANTS from 'CONSTANTS'
export default {
    ConstructionSiteHandler: function () {
        Object.keys(Game.constructionSites).forEach(siteName => {
            let site = Game.constructionSites[siteName];
            let buildersInRoom = site.room!.find(FIND_MY_CREEPS, {
                filter: (creep: Creep) => {
                    return creep.memory.role === 'builder'
                }
            }).length > 0;
            if (buildersInRoom) {
                let creepName = "builder" + Game.time;
                let nearestSpawn = <StructureSpawn>site.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (struct: Structure) => {
                        return struct.structureType === STRUCTURE_SPAWN
                    }
                });
                nearestSpawn.spawnCreep(CONSTANTS.BUILDER_BODY, creepName, {
                    memory: {
                        role: 'builder',
                        building: false
                    }
                });
                console.log("Spawning new builder: '" + creepName + "'");
            }
        })
    }

};
