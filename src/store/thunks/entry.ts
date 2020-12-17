import { defaultSlotStatus, defaultSlotType, Slot } from "store/complex/slot";
import { AppThunk } from "store/store";
import { v1 as uuid } from 'uuid';
import { addEntry as addEntryStore } from 'store/complex/complex';
import { Entry } from "store/complex/entry";


const addEntry = (_entry: Partial<Entry>): AppThunk => {

    return async (dispatch, getState) => {

        const title = _entry.title || `Entry between Slot ${_entry.beggining} and ${_entry.end}`;
        const beggining = _entry.beggining || getState().complex.slots.length;
        const end = _entry.end || getState().complex.slots.length + 1;

        const entry: Entry = {
            id: uuid(),
            title,
            beggining,
            end
        };

        dispatch(addEntryStore(entry));
    }
}

export {
    addEntry
}