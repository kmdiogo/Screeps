/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Helper Functions');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    FindClosestStructure: function(obj, structureTypes) {
        if (structureTypes.constructor != Array) {
            TypeError("Parameter structureTypes must be an array");
            return;
        }
        let source = obj.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => structureTypes.includes(s.structureType)
        });
        return source;
    },
    
    CleanMemory: function () {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    
    /**
     * Returns an array of creeps filtered by their role and what room they're in'
     */
    CreepList: function (creepRoles = [], rooms = []) {
        if (creepRoles.constructor != Array) {
            TypeError("Parameter 'creepRoles' must be an array'");
            return;
        }
        if (creepRoles.length == 0 && rooms.length == 0){
            return _.filter(Game.creeps, (creep) => true);
        }
        else if (creepRoles.length == 0){
            return _.filter(Game.creeps, (creep) => rooms.includes(creep.room.name));
        }
        else if (rooms.length == 0){
            return _.filter(Game.creeps, (creep) => creepRoles.includes(creep.memory.role));
        }
        else {
            return _.filter(Game.creeps, (creep) => creepRoles.includes(creep.memory.role) && rooms.includes(creep.room.name));
        }
    }
    
    
    
};