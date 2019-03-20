import { ErrorMapper } from "Utils/ErrorMapper";
import Towers from 'Structures/Towers'
import UI from 'UI/UI'
import RoomTasks from 'Room/Tasks'
import Global from 'Global/Global'
import CreepController from 'Controllers/CreepController'
import SpawnController from 'Controllers/SpawnController'

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  Global.CleanMemory();

  RoomTasks.ConstructionSiteHandler();

  Towers.runAll();

  //---------Linker--------------------------------
  const linkFrom = <StructureLink>Game.rooms['W28N38'].lookForAt('structure', 14, 9)[0];
  const linkTo = <StructureLink>Game.rooms['W28N38'].lookForAt('structure', 19, 22)[0];
  if (linkFrom.energy <= linkFrom.energyCapacity) {
    linkFrom.transferEnergy(linkTo);
  }
  //-------------------------------------------------

  UI.load();

  SpawnController.run();

  CreepController.run();
});
