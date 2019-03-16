var roleMover = {
    run: function(creep){
        // If creep has 50 or more energy, look for extensions/spawns that need energy first, then towers. If none of those structures need energy, store the excess in storage.
        if (creep.carry.energy >= 50)
        {
            if (!this.StoreEnergyInSpawns(creep))
            {
                if (!this.StoreEnergyInTowers(creep))
                {
                    this.StoreEnergyInStorage(creep);
                }
            }
        }
        
        // If mover has no energy, look for containers to withdraw energy from first, then the link closest to the controller, then storage.
        else
        {
            if (!this.WithdrawEnergyFromContainer(creep))
            {
                if (!this.WithdrawEnergyFromLink(creep))
                {
                    this.WithdrawEnergyFromStorage(creep);
                }
            }
        }
    },
    
    StoreEnergyInSpawns: function(creep)
    {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if(targets.length > 0)
        {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    
    StoreEnergyInTowers: function(creep)
    {
        let towers = creep.room.find(FIND_STRUCTURES, {
            filter:(s) => s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity
        });
        if (towers.length > 0)
        {
            if (creep.transfer(towers[0],RESOURCE_ENERGY) != OK)
            {
                creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    
    StoreEnergyInStorage: function(creep)
    {
        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_STORAGE});
        /*let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE 
        });*/
        if (target != null)
        {
            if (creep.transfer(target,RESOURCE_ENERGY) != OK)
            {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    
    WithdrawEnergyFromContainer: function(creep)
    {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100)
            }
        });
        if (targets.length > 0)
        {
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    
    WithdrawEnergyFromLink: function(creep)
    {
        let storageLink = creep.pos.findClosestByPath(FIND_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_LINK && s.energy > 400 });
        /*let upgraderLink = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (c) => c.structureType == STRUCTURE_CONTROLLER}).length > 0) && s.structureType == STRUCTURE_LINK &&
                s.energy > 400
        });*/
        if (storageLink != null)
        {
            if(creep.withdraw(storageLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(storageLink, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    },
    
    WithdrawEnergyFromStorage: function(creep)
    {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_STORAGE
        });
        if (targets.length > 0)
        {
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return true;
        }
        return false;
    }
};

module.exports = roleMover;