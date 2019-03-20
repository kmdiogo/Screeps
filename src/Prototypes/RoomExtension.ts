export default class RoomExtension {
    static extend() {
        Object.defineProperty(Room.prototype, 'sources', {
            get: function () {
                if (!this._sources) {
                    if (!this.memory.sourceIds) {
                        this.memory.sourceIds = this.find(FIND_SOURCES).map((source: Source) => source.id);
                    }
                    // Get the source objects from the id's in memory and store them locally
                    this._sources = this.memory.sourceIds.map((id: string) => Game.getObjectById(id));
                }
                // return the locally stored value
                return this._sources;
            },
            set: function (newValue) {
                // when storing in memory you will want to change the setter
                // to set the memory value as well as the local value
                this.memory.sources = newValue.map((source: Source) => source.id);
                this._sources = newValue;
            },
            enumerable: false,
            configurable: true
        });
    }
}
