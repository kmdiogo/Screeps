import Mover from 'Roles/Mover'
export default {
    run(creep: Creep) {
        //If builder has no energy, find the closest storage unit to withdraw energy from
        if (creep.carry.energy == 0) {
            this.WithdrawEnergyFromStorage(creep);
        }
        //If the builder has energy, first look for construction sites to build, if there are non, repair all damaged roads
        else {
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {

                if (creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
                    creep.say('🔄 Energy!');
                }
                if (!creep.memory.building && creep.carry.energy > 0) {
                    creep.memory.building = true;
                    creep.say('🚧 build');
                }
                if (creep.memory.building) {
                    if (targets.length > 0) {
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#0000ff' } });
                        }
                    }
                }
            }
            else {
                let roads = creep.room.find(FIND_STRUCTURES,
                    {
                        filter: (structure) => { return (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax) }
                    });
                //Sort roads array from least hits to greatest
                roads = _.sortBy(roads, road => road.hits)
                if (roads.length > 0) {
                    if (creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roads[0], { visualizePathStyle: { stroke: '#0000ff' } });
                    }
                }
                else {
                    new Mover(creep).run();
                }
            }
        }
    },

    WithdrawEnergyFromStorage: function (creep: Creep) {
        let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
        });
        if (target != null) {
            if (creep.withdraw(target, RESOURCE_ENERGY) != OK) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#0000ff' } });
            }
            return true;
        }
        return false;
    }
};
