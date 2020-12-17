import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Park {
    entries: number,
    types: ParkTypes
}

enum ParkTypes {
    SP = 'Small Parking',
    MP = 'Medium Parking',
    LP = 'Large Parking'
}

let initialState: Park = {
    entries: 3,
    types: ParkTypes.SP
}

const parkSlice = createSlice({
    name: 'park',
    initialState,
    reducers: {
        addEntries(state) {
            state.entries = state.entries + 1
        },
        
    }
})

export const {
    addEntries
} = parkSlice.actions

export default parkSlice.reducer