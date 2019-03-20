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
    },

    defineMemory(prototype: _Constructor<Object>) {
        Object.defineProperty(prototype, 'memory', {
            get: function () {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    return undefined;
                }
                return Memory.sources[this.id] = Memory.sources[this.id] || {};
            },
            set: function (value) {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    throw new Error('Could not set source memory');
                }
                Memory.sources[this.id] = value;
            }
        })

    }



};
