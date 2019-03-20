import FriendsList from 'Options/FriendsList'
export default class Tower {
    private tower: StructureTower;
    constructor(tower: StructureTower) {
        this.tower = tower;
    }

    run() {
        if (!this.defendRoom())
            this.maintain();
    }


    private defendRoom() {
        let hostiles = this.tower.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => !(creep.owner.username in FriendsList)
        });
        //console.log("Hostiles in Room: " + hostiles);
        if (hostiles.length > 0) {
            let user = hostiles[0].owner.username;
            //Game.notify(`User ${user} spotted in room 'W28N38');
            this.tower.attack(hostiles[0]);
            return true;
            /*let towers = <StructureTower[]>this.tower.room.find(FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_TOWER
                }
            });
            towers.forEach(tower => tower.attack(hostiles[0]));*/
        }
        return false;
    }

    private maintain() {
        let repairList = this.tower.pos.findInRange(FIND_STRUCTURES, 3, {
            filter: (structure) => {
                return (
                    (structure.structureType == STRUCTURE_RAMPART && structure.hits < 2000000 && structure.hits > 0)
                )
            }
        });
        repairList = _.sortBy(repairList, wall => wall.hits);
        if (repairList.length > 0 && this.tower.energy > 500) {
            this.tower.repair(repairList[0]);
        }
    }

    static runAll() {
        for (let roomName in Game.rooms) {
            let towers = <StructureTower[]>Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
                filter: (struct) => { return struct.structureType === STRUCTURE_TOWER }
            });
            towers.forEach((tower) => {
                new Tower(tower).run();
            })
        }
    }

};

