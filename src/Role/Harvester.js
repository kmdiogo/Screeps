module.exports = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        //If the harvester has max energy, look for the adjacent container/link. If the container is damaged, repair it. If not, store energy into it.
        if (creep.carry.energy == creep.carryCapacity)
        {
            if (!this.RepairAdjContainer(creep))
            {
                this.StoreEnergy(creep);
            }
        }
	    else {
	        this.GatherEnergy(creep);
        }
	},
	
    //If energy is not maxed, look for the adjacent source to harvest from. If no adjacent source is found, look for a source that has no adjacent harvesters (unoccupied).
	GatherEnergy: function (creep)
	{
        let adjSource = creep.pos.findInRange(FIND_SOURCES,1);
    	if (adjSource.length > 0)
    	{
    	    if(creep.harvest(adjSource[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(adjSource[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
    	}
    	else
    	{
	        let availableSource = creep.pos.findClosestByPath(FIND_SOURCES, {
	            filter: (source) => source.pos.findInRange(FIND_MY_CREEPS, 1).length == 0
	        });
            if(creep.harvest(availableSource) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(availableSource, {visualizePathStyle: {stroke: '#ffff00'}});
            }
    	}
	},
	
	RepairAdjContainer: function(creep)
	{
        let container = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
        });
        //Only repair the container if and the energy of the current room is near max (This is to avoid when there is shortage of energy and new creeps need to be prioritized)
        if (container.length > 0 && creep.room.energyAvailable)
        {
            creep.repair(container[0]);
            return true;
        }
        return false;
	},
	
	StoreEnergy: function(creep)
	{
        let storageObj = creep.pos.findInRange(FIND_STRUCTURES, 1 , {
            filter: (structure) => ((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity) ||
            (structure.structureType == STRUCTURE_LINK))
        });
        if (storageObj.length > 0)
        {
            creep.transfer(storageObj[0] , RESOURCE_ENERGY);
            return true;
        }
        return false;
	}

};
