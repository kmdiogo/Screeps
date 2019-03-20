import RoomExtension from 'Prototypes/RoomExtension'
import SourceExtension from 'Prototypes/SourceExtension'
export default class PrototypeController {
    static extendPrototypes() {
        RoomExtension.extend();
        //SourceExtension.extend();
    }
}
