import { Entry } from "store/complex/entry";
import { Slot, SlotStatus, SlotTypes } from "store/complex/slot";
import { Vehicle, VehicleStatus, VehicleTypes } from "store/complex/vehicle";
import differenceInHours from 'date-fns/differenceInHours'
import { v1 as uuid } from 'uuid';

interface ComposeVehicle {
    plateNumber?: string,
    entry: Entry,
    type: VehicleTypes,
    slot: Slot,
}

const composeVehicle = ({ plateNumber, entry, type, slot }: ComposeVehicle) => {
    const id = uuid();
    const timeIn = new Date().toISOString();
    const _plateNumber = plateNumber || `No Plate - ${id}`;
    const status = VehicleStatus.in;

    const vehicle: Vehicle = {
        id,
        plateNumber: _plateNumber,
        timeIn,
        entry,
        type,
        slot,
        status
    }

    return vehicle
}

const checkReturneeVehicle = (plateNumber: string, vehicles: Vehicle[]) => {
    const timeNow = new Date();
    const vehicle = vehicles.find((_vehicle) => {

        const timeOut = _vehicle.timeOut;

        if (!timeOut) {
            return false
        }

        return _vehicle.plateNumber === plateNumber && differenceInHours(new Date(timeOut), timeNow) < 1
    });

    return vehicle
}



export {
    composeVehicle,
    checkReturneeVehicle,
}