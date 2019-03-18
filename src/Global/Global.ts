export default {
    /**
     * Removes any non-existent screep name from memory
     */
    CleanMemory() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
}
