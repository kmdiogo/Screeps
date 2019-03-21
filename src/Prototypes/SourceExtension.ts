import helpers from 'Utils/Helpers'
export default class SourceExtension {
    static extend() {
        Memory.sources = Memory.sources || {};
        //helpers.defineMemory(Source.prototype);
        Object.defineProperty(Source.prototype, 'memory', {
            get: function () {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    return undefined;
                }
                return Memory.sources[this.id] = Memory.sources[this.id] || {};
            },
            set: function (value) {
                if (_.isUndefined(Memory.sources)) {
                    Memory.sources = {};
                }
                if (!_.isObject(Memory.sources)) {
                    throw new Error('Could not set source memory');
                }
                Memory.sources[this.id] = value;
            },
            enumerable: false,
            configurable: true
        });


        Object.defineProperty(Source.prototype.memory, "workers", {
            get: function () {
                console.log("Worker getter called");
                if (!this._workers) {
                    if (!this.workers) {
                        this.memory.workers = 0;
                    }
                    this._workers = 0;
                }
                // return the locally stored value
                return this._workers;
            },
            set: function (newValue) {
                // when storing in memory you will want to change the setter
                // to set the memory value as well as the local
                this.memory.workers = newValue;
                this._workers = newValue;
            },
            enumerable: false,
            configurable: true
        });
    }


}
