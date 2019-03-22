import helpers from 'Utils/Helpers'
export default class SourceExtension {
    static extend() {
        Memory.sources = Memory.sources || {};
        helpers.defineMemory(Source.prototype);

        Object.defineProperty(Source.prototype, "workers", {
            get: function () {
                if (this._workers == undefined) {
                    if (this.memory.workers == undefined) {
                        this.memory.workers = 0;
                    }

                    this._workers = this.memory.workers;
                }
                // return the locally stored value
                return this._workers;
            },
            set: function (newValue) {
                // when storing in memory you will want to change the setter
                // to set the memory value as well as the local
                Memory.sources[this.id].workers = newValue;
                this._workers = newValue;
            },
            enumerable: false,
            configurable: true
        });
    }


}
