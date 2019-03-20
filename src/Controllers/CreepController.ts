import Builder from 'Roles/Builder'
import Upgrader from 'Roles/Upgrader'
import Mover from 'Roles/Mover'
import Repairer from 'Roles/Repairer'
import Scout from 'Roles/Scout'
import Harvester from 'Roles/Harvester'

export default class CreepController {
    static run() {
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
    }
}

