export default {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        if (creep.carry.energy == 0) {
            let link = <StructureStorage>creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s: Structure) => s.structureType == STRUCTURE_STORAGE
            });
            if (creep.withdraw(link, RESOURCE_ENERGY) != OK) {
                creep.moveTo(link, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            const wallMax = 200000
            const roadMax = 2500
            var repairList = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        (structure.structureType == STRUCTURE_RAMPART && structure.hits < (structure.hitsMax) && structure.hits > 0) ||
                        (structure.structureType == STRUCTURE_WALL && structure.hits < (structure.hitsMax) && structure.hits > 0) ||
                        //(structure.structureType == STRUCTURE_CONTAINER && structure.hits < (structure.hitsMax) && structure.hits > 0) ||
                        (structure.structureType == STRUCTURE_ROAD) ||
                        (structure.structureType == STRUCTURE_WALL && structure.hits < wallMax)
                    )
                }
            });
            repairList = _.sortBy(repairList, structure => structure.hits)
            if (repairList.length > 0) {
                if (creep.repair(repairList[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairList[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

