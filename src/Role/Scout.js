var roleScout = {
    run: function(creep) {
        let creepTargets = creep.room.lookForAt('creep', Game.flags['NickyStixx'].pos.x, Game.flags['NickyStixx'].pos.y)[0];
        let structureTargets = creep.room.lookForAt('structure', Game.flags['NickyStixx'].pos.x, Game.flags['NickyStixx'].pos.y)[0];
        creep.moveTo(Game.flags['NickyStixx']);
        //console.log(creep.attack(structureTargets));
     
        /*if (creepTargets)
        {
            console.log(creepTargets);
            if (creep.attack(creepTargets != OK))
            {
            creep.moveTo(Game.flags['NickyStixx'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if (structureTargets)
        {
            console.log(structureTargets);
            if (creep.attack(structureTargets != OK))
            {
            creep.moveTo(Game.flags['NickyStixx'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }*/
	}
};

module.exports = roleScout;
