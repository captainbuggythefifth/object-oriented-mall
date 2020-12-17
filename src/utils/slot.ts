import { Entry } from "store/complex/entry";
import { Slot, SlotStatus, SlotTypes } from "store/complex/slot";
import { VehicleTypes } from "store/complex/vehicle";

const compatibilities = {
    [VehicleTypes.S]: [
        SlotTypes.SP,
        SlotTypes.MP,
        SlotTypes.LP
    ],
    [VehicleTypes.M]: [
        SlotTypes.MP,
        SlotTypes.LP
    ],
    [VehicleTypes.L]: [
        SlotTypes.LP
    ],
};

const isCompatible = (position: number, vehicleType: VehicleTypes, slots: Slot[]) => {
    const compatibility = compatibilities[vehicleType];
    const slot = slots[position];
    let compatible = false;

    let includes = false;

    compatibility.map((compa) => {
        if (compa === slot.type) {
            includes = true;
        }
    });

    if (includes && slot.status === SlotStatus.vacant) {
        compatible = true
    }

    return compatible
}

const getTranversibleIndexByDirection = (direction: string, count: number, index: number) => {
    let traversibleIndex: number = 0;

    if (direction === "left") {
        traversibleIndex = index - count;
    } else if (direction === "right") {
        traversibleIndex = index + count;
    }

    return traversibleIndex
}

const getAppropriateSlotByEntry =  (vehicleType: VehicleTypes, entry: Entry, slots: Slot[]) => {
    // let closest: Slot = slots[0];
    let compatible = false;
    let index = entry.beggining;
    let traversibleIndex = index;
    let count = 0;
    let direction = "left";
    do {

        if (traversibleIndex === index) {
            traversibleIndex = getTranversibleIndexByDirection(direction, count, index);
        }

        else {
            traversibleIndex = getTranversibleIndexByDirection(direction, count, traversibleIndex);
        }

        if (traversibleIndex <= 0) {
            traversibleIndex = slots.length // await getTranversibleIndexByDirection(direction, count, slots.length);
        }

        if (traversibleIndex >= slots.length) {
            traversibleIndex = 0 // await getTranversibleIndexByDirection(direction, count, 0);
        }

        compatible = isCompatible(traversibleIndex, vehicleType, slots);
        if (compatible) {
            break;
        }

        count++;
        direction = direction === "left" ? "right" : "left"

        if (count >= slots.length) {
            break;
        }

    } while (!compatible);

    const closest: Slot = slots[traversibleIndex];

    return closest
}

export {
    isCompatible,
    getAppropriateSlotByEntry
}