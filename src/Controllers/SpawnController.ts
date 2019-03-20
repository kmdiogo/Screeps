export default class SpawnController {
    /**
     * Spawns all creeps based on current needs
     */
    static run() {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let movers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mover');
        let scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

        const maxHarvesters = 2;
        const maxUpgraders = 1;
        const maxMovers = 2;
        const maxRepairers = 1;
        const maxScouts = 0;
        //----------------------------------------------------------------

        //-----------Spawning Creeps--------------------------------------
        var Harvester1 = [WORK, WORK, WORK, WORK, WORK, WORK, MOVE, CARRY];
        var Upgrader1 = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE];
        var Repairer1 = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE];
        var Mover1 = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        var Builder1 = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        var Scout1 = [ATTACK, MOVE, MOVE];
        if (harvesters.length < maxHarvesters) {
            var newHarvesterName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newHarvesterName);
            Game.spawns['Spawn1'].spawnCreep(Harvester1, newHarvesterName, {
                memory: { role: 'harvester', building: false }
            });
        }
        else if (movers.length < maxMovers) {
            var newMoverName = 'Mover' + Game.time;
            console.log('Spawning new Mover: ' + newMoverName);
            Game.spawns['Spawn1'].spawnCreep(Mover1, newMoverName, {
                memory:
                    { role: 'mover', building: false }
            });
        }
        else if (upgraders.length < maxUpgraders) {
            var newUpgraderName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newUpgraderName);
            Game.spawns['Spawn1'].spawnCreep(Upgrader1, newUpgraderName, {
                memory:
                    { role: 'upgrader', building: false }
            });
        }
        else if (repairers.length < maxRepairers) {
            var newRepairerName = 'Repairer' + Game.time;
            console.log('Spawning Repairer: ' + newRepairerName);
            Game.spawns['Spawn1'].spawnCreep(Repairer1, newRepairerName, {
                memory:
                    { role: 'repairer', building: false }
            });
        }
        else if (scouts.length < maxScouts) {
            var newScoutName = 'Scout' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(Scout1, newScoutName, {
                memory: { role: 'scout', building: false }
            });
        }
    }
}
