/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Helper Functions');
 * mod.thing == 'a thing'; // true
 */
export default {
    /*FindClosestStructure: function (obj: Structure, structureTypes: Structure[]) {
        let source = obj.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => structureTypes.includes(s.structureType)
        });
        return source;
    },*/

    /**
     * Returns an array of creeps filtered by their role and what room they're in'
     */
    CreepList: function (creepRoles: string[] = [], rooms: string[] = []) {
        if (creepRoles.length == 0 && rooms.length == 0) {
            return _.filter(Game.creeps, (creep) => true);
        }
        else if (creepRoles.length == 0) {
            return _.filter(Game.creeps, (creep) => rooms.includes(creep.room.name));
        }
        else if (rooms.length == 0) {
            return _.filter(Game.creeps, (creep) => creepRoles.includes(creep.memory.role));
        }
        else {
            return _.filter(Game.creeps, (creep) => creepRoles.includes(creep.memory.role) && rooms.includes(creep.room.name));
        }
    }



};
