import Helpers from 'Utils/Helpers'
import CONSTANTS from 'CONSTANTS'

export default class UI {
    static load() {
        let harvesters = Helpers.CreepList(['harvester']);
        let upgraders = Helpers.CreepList(['upgrader']);
        let builders = Helpers.CreepList(['builder']);
        let repairers = Helpers.CreepList(['repairer']);
        let movers = Helpers.CreepList(['mover']);
        let scouts = Helpers.CreepList(['scout']);
        if (movers.length == 0 && harvesters.length == 0) {
            Game.notify('No Harvesters or Builders are present in room!', 180);
        }
        new RoomVisual().text(`Harvesters: ${harvesters.length} / ${CONSTANTS.MAX_HARVESTERS}`, 5, 0, { align: 'left', opacity: 0.8 });
        new RoomVisual().text(`Movers: ${movers.length} / ${CONSTANTS.MAX_MOVERS}`, 5, 1, { align: 'left', opacity: 0.8 });
        new RoomVisual().text(`Upgraders: ${upgraders.length} / ${CONSTANTS.MAX_UPGRADERS}`, 5, 2, { align: 'left', opacity: 0.8 });
        new RoomVisual().text(`Builders: ${builders.length}`, 5, 3, { align: 'left', opacity: 0.8 });
        new RoomVisual().text(`Repairers: ${repairers.length} / ${CONSTANTS.MAX_REPAIRERS}`, 5, 4, { align: 'left', opacity: 0.8 });
        new RoomVisual().text(`Energy: ${Game.spawns.Spawn1.room.energyAvailable} / ${Game.spawns.Spawn1.room.energyCapacityAvailable}`, 5, 5, { align: 'left', opacity: 0.8 });

        this.showSpawning();
    }


    static showSpawning() {
        if (!Game.spawns['Spawn1'].spawning) return;

        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning!.name];
        Game.spawns['Spawn1']!.room.visual.text(
            `🛠️ ${spawningCreep.memory.role}`,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

};
