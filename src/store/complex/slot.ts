import { v1 as uuid } from 'uuid';

export enum SlotTypes {
    SP = 'SP',
    MP = 'MP',
    LP = 'LP'
}

export enum SlotStatus {
    vacant = 'vacant',
    occupied = 'occupied'
}

export interface Slot {
    type: SlotTypes
    id: string,
    position: number,
    status: SlotStatus
}

const generateRandomSlotType = () => {
    const rand = Math.floor(Math.random() * 100);

    let slotType = SlotTypes.LP // defaultVehicleType;
    
    if (rand > 0 && rand < 33) {
        slotType = SlotTypes.SP
    }

    if (rand > 33 && rand < 66) {
        slotType = SlotTypes.MP
    }

    if (rand > 66 && rand < 99) {
        slotType = SlotTypes.LP
    }

    return slotType
}

const initializeSlots = () => {
    let slots = [];

    for(let i = 0; i < 20; i++) {
        const type = generateRandomSlotType()
        const slot: Slot = {
            id: uuid(),
            type,
            position: i,
            status: SlotStatus.vacant
        }

        slots.push(slot)
    }

    return slots
}

export const initialSlots: Slot[] = initializeSlots();

export const defaultSlotType = SlotTypes.LP;

export const defaultSlotStatus = SlotStatus.vacant

