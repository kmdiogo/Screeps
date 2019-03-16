module.exports = {
    defendRoom: function(roomName) {
        let hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => creep.owner.username != 'NickyStixx45'
        });
        //console.log("Hostiles in Room: " + hostiles);
        if(hostiles.length > 0) {
        let user = hostiles[0].owner.username;
        //Game.notify(`User ${user} spotted in room 'W28N38');
            let towers = Game.rooms[roomName].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
            }
    },
    
    maintain: function(theTower)
    {
        let repairList = theTower.pos.findInRange(FIND_STRUCTURES,3, { 
            filter: (structure) => { 
            return (
                (structure.structureType == STRUCTURE_RAMPART && structure.hits < 2000000 && structure.hits > 0)
                )}});
       repairList =  _.sortBy(repairList, wall => wall.hits);
        if (repairList.length > 0 && theTower.energy > 500)
        {
            theTower.repair(repairList[0]);
        }
    }
    
};

