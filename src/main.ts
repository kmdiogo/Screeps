import { ErrorMapper } from "Utils/ErrorMapper";
import Builder from 'Roles/Builder'
import Upgrader from 'Roles/Upgrader'
import Mover from 'Roles/Mover'
import Repairer from 'Roles/Repairer'
import Scout from 'Roles/Scout'
import Harvester from 'Roles/Harvester'
import Tower from 'Roles/Tower'
import UI from 'UI/UI'
import Helpers from 'Utils/Helpers'
import RoomTasks from 'Room/Tasks'
import Global from 'Global/Global'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  RoomTasks.ConstructionSiteHandler();
  //-------Delete memory of deceased creeps------
  Global.CleanMemory();
  //----------------------------------------------
  //-------------Tower----------------------------
  for (let roomName in Game.rooms) {
    let towers = <StructureTower[]>Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
      filter: (struct) => { return struct.structureType === STRUCTURE_TOWER }
    });
    towers.forEach((tower) => {
      new Tower(tower).run();
    })
  }
  //--------------------------------------------------------------------------------------

  //---------Linker--------------------------------
  const linkFrom = <StructureLink>Game.rooms['W28N38'].lookForAt('structure', 14, 9)[0];
  const linkTo = <StructureLink>Game.rooms['W28N38'].lookForAt('structure', 19, 22)[0];
  if (linkFrom.energy <= linkFrom.energyCapacity) {
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

  UI.showSpawning();
  //-----------------------------------------------------
  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
      Harvester.run(creep);
    }
    if (creep.memory.role == 'upgrader') {
      Upgrader.run(creep);
    }
    if (creep.memory.role == 'builder') {
      Builder.run(creep);
    }
    if (creep.memory.role == 'mover') {
      new Mover(creep).run();
    }
    if (creep.memory.role == 'repairer') {
      Repairer.run(creep);
    }
    if (creep.memory.role == 'scout') {
      Scout.run(creep);
    }
  }
});
