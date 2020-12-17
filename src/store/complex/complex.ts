import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { idText } from 'typescript'
import { Entry, initialEntries } from './entry'
import { initialSlots, Slot, SlotStatus } from './slot'
import { Vehicle, VehicleStatus } from './vehicle'


interface Complex {
    entries: Entry[],
    slots: Slot[],
    vehicles: Vehicle[],
}


let initialState: Complex = {
    entries: initialEntries,
    slots: initialSlots,
    vehicles: []
}

const parkSlice = createSlice({
    name: 'park',
    initialState,
    reducers: {
        addEntry(state, action: PayloadAction<Entry>) {
            state.entries.push(action.payload)
            // return state;
        },
        addSlot(state, action: PayloadAction<Slot>) {
            state.slots.push(action.payload);
            // return state;
        },
        addVehicle(state, action: PayloadAction<Vehicle>) {
            state.vehicles.push(action.payload);
            // return state
        },

        updateVehicleOut(state, action: PayloadAction<{vehicle: Vehicle, status: VehicleStatus, fee: number, timeOut: string }>) {
            const { vehicle, status, fee, timeOut } = action.payload;

            const update = {
                ...vehicle,
                status,
                fee,
                timeOut
            };

            const vehicleIndex = state.vehicles.findIndex((_vehicle) => {
                return _vehicle.id === vehicle.id
            })
            
            state.vehicles[vehicleIndex] = update;
        
        },

        updateVehicleStatus(state, action: PayloadAction<{vehicle: Vehicle, status: VehicleStatus }>) {
            const { vehicle, status } = action.payload;

            const update = {
                ...vehicle,
                status,
            };

            const vehicleIndex = state.vehicles.findIndex((_vehicle) => {
                return _vehicle.id === vehicle.id
            })
            
            state.vehicles[vehicleIndex] = update;
        
        },

        updateSlotStatus(state, action: PayloadAction<{slot: Slot, status: SlotStatus}>) {
            const { slot, status } = action.payload;

            const updateSlot = {
                ...slot,
                status,
            };
            
            state.slots[updateSlot.position] = updateSlot
            // state.slots.
        }
    }
})

export const {
    addEntry,
    addSlot,
    addVehicle,
    updateSlotStatus,
    updateVehicleOut,
    updateVehicleStatus
} = parkSlice.actions

export default parkSlice.reducer