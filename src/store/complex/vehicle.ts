import { Entry } from "./entry";
import { Slot } from "./slot";

export enum VehicleTypes {
    S = 'S',
    M = 'M',
    L = 'L'
}

export enum VehicleStatus {
    in = 'in',
    out = 'out'
}

export interface Vehicle {
    id: string,
    plateNumber: string,
    timeOut?: string,
    timeIn: string,
    entry: Entry,
    exit?: Entry,
    type: VehicleTypes,
    slot?: Slot,
    status: VehicleStatus,
    fee?: number
}

export const defaultVehicleType = VehicleTypes.L 
export const vehicleTypeSmall = VehicleTypes.S 
export const vehicleTypeMedium = VehicleTypes.M 
export const vehicleTypeLarge = VehicleTypes.L 

