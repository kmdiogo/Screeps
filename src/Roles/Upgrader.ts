
export default {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        let adjLink = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (s) => s.structureType == STRUCTURE_LINK
        });
        if (creep.carry.energy == 0 && adjLink.length > 0) {
            if (creep.withdraw(adjLink[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(adjLink[0], { visualizePathStyle: { stroke: '#ffffff' } })
            }
        }
        else if (creep.upgradeController(creep.room.controller!) != OK) {
            creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
            creep.say('⚡ upgrade');
        }
    }
};
