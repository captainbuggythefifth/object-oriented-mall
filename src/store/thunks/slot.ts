import { defaultSlotStatus, defaultSlotType, Slot } from "store/complex/slot";
import { AppThunk } from "store/store";
import {v1 as uuid} from 'uuid';
import { addSlot as addSlotStore } from 'store/complex/complex';


const addSlot = (_slot: Partial<Slot>): AppThunk => {

    return async (dispatch, getState) => {
        
        const type = _slot.type || defaultSlotType;

        const slot: Slot = {
            id: uuid(),
            type,
            position: getState().complex.slots.length + 1,
            status: defaultSlotStatus
        };

        dispatch(addSlotStore(slot));
    }
}

export {
    addSlot
}