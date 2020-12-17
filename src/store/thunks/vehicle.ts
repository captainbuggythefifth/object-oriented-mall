import { addVehicle as addVehicleStore, updateSlotStatus as updateSlotStatusStore, updateVehicleOut as updateVehicleOutStore, updateVehicleStatus as updateVehicleStatusStore } from 'store/complex/complex';
import { Entry } from 'store/complex/entry';
import { Slot, SlotStatus, SlotTypes } from 'store/complex/slot';
import { defaultVehicleType, Vehicle, VehicleStatus, VehicleTypes } from 'store/complex/vehicle';
import { AppThunk } from 'store/store';

import { calculateFee } from 'utils/fee';
import { getAppropriateSlotByEntry } from 'utils/slot';
import { checkReturneeVehicle, composeVehicle } from 'utils/vehicle';

const park = (_vehicle: Partial<Vehicle>): AppThunk => {

    return async (dispatch, getState) => {
        const time = new Date().toISOString();
        const type = _vehicle.type || defaultVehicleType;

        const assignEntry = _vehicle.entry || getState().complex.entries[0]
        const assignSlotByEntry = getAppropriateSlotByEntry(type, assignEntry, getState().complex.slots);


        let vehicle: Vehicle;

        // Firstly, we must check if the vehicle in a returnee - meaning, the vehicle has gone out of the complex and got back in within an hour (3 c)
        if (_vehicle.plateNumber) {
            // We will check via plate number
            const returneeVehicle = checkReturneeVehicle(_vehicle.plateNumber, getState().complex.vehicles);

            if (returneeVehicle) {
                vehicle = returneeVehicle;

                // we must update the status of the returnee vehicle to in
                dispatch(updateVehicleStatusStore({
                    vehicle,
                    status: VehicleStatus.in
                }));

            } else {
                // must compose new vehicle assign to a slot
                vehicle = composeVehicle({
                    plateNumber: _vehicle.plateNumber,
                    entry: assignEntry,
                    type,
                    slot: assignSlotByEntry,
                });

                dispatch(addVehicleStore(vehicle));
            }

        } else {
            // must compose new vehicle assign to a slot
            vehicle = vehicle = composeVehicle({
                plateNumber: _vehicle.plateNumber,
                entry: assignEntry,
                type,
                slot: assignSlotByEntry,
            });

            dispatch(addVehicleStore(vehicle));
        }

        // update the slot to be occupied
        dispatch(updateSlotStatusStore({
            slot: assignSlotByEntry,
            status: SlotStatus.occupied
        }));
    }
}

const unpark = (slot: Slot): AppThunk => {
    return async (dispatch, getState) => {
        // find the vehicle from the vehicles
        const vehicle = getState().complex.vehicles.find((_vehicle) => {
            return _vehicle.slot?.id === slot.id && _vehicle.status === VehicleStatus.in
        });

        if (!vehicle) {
            return false
        }

        // mark the vehicle as out
        dispatch(updateVehicleOutStore({
            vehicle,
            fee: calculateFee(vehicle),
            status: VehicleStatus.out,
            timeOut: new Date().toISOString()
        }))

        // vacant the slot
        dispatch(updateSlotStatusStore({
            slot,
            status: SlotStatus.vacant
        }));

        // return vehicle
    }
}

export {
    park,
    unpark
}