var roleHarvester = require('Role.Harvester');
var roleUpgrader = require('Role.Upgrader');
var roleBuilder = require('Role.Builder');
var roleMover = require('Role.Mover');
var roleRepairer = require('Role.Repairer');
var roleScout = require('Role.Scout');
var UI = require('UI');
var Helpers = require('Util.Helpers');
var roleTower = require('Role.Tower');
var RoomTasks = require('Room.Tasks');
module.exports.loop = function () {
    RoomTasks.ConstructionSiteHandler();
    //-------Delete memory of deceased creeps------
    Helpers.CleanMemory();
    //----------------------------------------------
    //-------------Tower----------------------------
    roleTower.defendRoom('W28N38');
    let towers = Game.rooms['W28N38'].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    towers.forEach(tower => roleTower.maintain(tower));
    //--------------------------------------------------------------------------------------

    //---------Linker--------------------------------
    const linkFrom = Game.rooms['W28N38'].lookForAt('structure', 14, 9)[0];
    const linkTo = Game.rooms['W28N38'].lookForAt('structure', 19,22)[0];
    if (linkFrom.energy <= linkFrom.energyCapacity)
    {
        linkFrom.transferEnergy(linkTo);
    }
    //-------------------------------------------------
    //-------Room information-----------------------------
    UI.loadUI();
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
    var Harvester1 = [WORK,WORK,WORK,WORK,WORK,WORK,MOVE,CARRY];
    var Upgrader1 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE];
    var Repairer1 = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
    var Mover = [CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    var Builder = [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
    var Scout = [ATTACK,MOVE,MOVE];
    if(harvesters.length < maxHarvesters) {
        var newHarvesterName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newHarvesterName);
        Game.spawns['Spawn1'].spawnCreep(Harvester1, newHarvesterName,
            {memory: {role: 'harvester'}
            });
    }
    else if(movers.length < maxMovers) {
        var newMoverName = 'Mover' + Game.time;
        console.log('Spawning new Mover: ' + newMoverName);
        Game.spawns['Spawn1'].spawnCreep(Mover, newMoverName,
            {memory:
            {role: 'mover'}
            });
    }
    else if(upgraders.length < maxUpgraders) {
        var newUpgraderName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newUpgraderName);
        Game.spawns['Spawn1'].spawnCreep(Upgrader1, newUpgraderName,
            {memory:
            {role: 'upgrader'}
            });
    }
    else if(repairers.length < maxRepairers) {
        var newRepairerName = 'Repairer' + Game.time;
        console.log('Spawning Repairer: ' + newRepairerName);
        Game.spawns['Spawn1'].spawnCreep(Repairer1, newRepairerName,
            {memory:
            {role: 'repairer'}
            });
    }
    else if (scouts.length < maxScouts)
    {
        var newScoutName = 'Scout' + Game.time;
        Game.spawns['Spawn1'].spawnCreep(Scout, newScoutName,
        {
            memory: {role:'scout'}
        });
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    //-----------------------------------------------------

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'mover'){
            roleMover.run(creep);
        }
        if (creep.memory.role == 'repairer')
        {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'scout')
        {
            roleScout.run(creep);
        }
    }
    //energyStructures =


}
