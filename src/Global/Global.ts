export default {
    /**
     * Removes any non-existent screep name from memory
     */
    CleanMemory() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester'),
    upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'),
    builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'),
    repairers: _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer'),
    movers: _.filter(Game.creeps, (creep) => creep.memory.role == 'mover'),
    scouts: _.filter(Game.creeps, (creep) => creep.memory.role == 'scout')
}


