
import { Entry, initialEntries } from "store/complex/entry";
import { initialSlots, Slot } from "store/complex/slot";
import { defaultVehicleType, Vehicle, VehicleTypes } from "store/complex/vehicle";
import { calculateExceedingDays, calculateExceedingHours, calculateFee, feeFlatRate, feeStructureSlotType } from "utils/fee";
import { composeVehicle } from "utils/vehicle";
import addDays from 'date-fns/addDays'
import addMinutes from 'date-fns/addMinutes';
import addHours from 'date-fns/addHours';

describe('fee', () => {

    let vehicle: Vehicle;
    const plateNumber = "abcd123";
    const entries: Entry[] = initialEntries;
    const type: VehicleTypes = defaultVehicleType;
    const slots: Slot[] = initialSlots;

    const entry = entries[0];
    const slot = slots[0];
    beforeEach(() => {
        
        vehicle = composeVehicle({
            plateNumber,
            entry,
            type,
            slot,
        });

    });

    it('should equal feeFlatRate', () => {
        const fee = calculateFee(vehicle);

        expect(fee).toBe(feeFlatRate)
    });

    it('should return feeFlatRate spent when less than 3 hours', () => {

        const timeIn = addHours(new Date(), -2);
        vehicle.timeIn = timeIn.toISOString();
        
        const fee = calculateFee(vehicle);

        expect(fee).toBe(feeFlatRate)
    });

    it('should return feeFlatRate spent when less than 3 hours', () => {

        const timeIn = addMinutes(new Date(), -159);
        vehicle.timeIn = timeIn.toISOString();
        
        const fee = calculateFee(vehicle);

        expect(fee).toBe(feeFlatRate)
    });

    it('should return feeFlatRate + hours succeeding spent when greater than 3 hours', () => {
        const addInHours = -3;

        const timeIn = addHours(new Date(), addInHours);
        vehicle.timeIn = timeIn.toISOString();

        let feeStructure = feeStructureSlotType[slot.type];

        const fee = calculateFee(vehicle);

        expect(fee).toBe(feeFlatRate + feeStructure.suceedingPerHour * Math.abs(addInHours));
    });

    it('should return feeFlatRate + hours succeeding spent when less than 24 hours', () => {
        const difference = -23;

        const timeIn = addHours(new Date(), difference);
        vehicle.timeIn = timeIn.toISOString();

        let feeStructure = feeStructureSlotType[slot.type];

        const fee = calculateFee(vehicle);
        
        const expectedFee = calculateExceedingHours({
            flatRateFee: feeFlatRate,
            suceedingPerHour: feeStructure.suceedingPerHour,
            difference:  Math.abs(difference),
        });

        expect(fee).toBe(expectedFee);
    });

    it('should return feeFlatRate + hours succeeding spent when greater than 25 hours', () => {
        const difference = -25;

        const timeIn = addHours(new Date(), difference);
        vehicle.timeIn = timeIn.toISOString();

        let feeStructure = feeStructureSlotType[slot.type];

        const fee = calculateFee(vehicle);

        const expectedFee = calculateExceedingDays({
            flatRateFee: feeFlatRate,
            suceedingPerHour: feeStructure.suceedingPerHour,
            difference:  Math.abs(difference),
            exceedingPerDay: feeStructure.exceedingPerDay
        });

        expect(fee).toBe(expectedFee);
    });

    it('should return feeFlatRate + hours succeeding spent when greater than 50 hours', () => {
        const difference = -50;

        const timeIn = addHours(new Date(), difference);
        vehicle.timeIn = timeIn.toISOString();

        let feeStructure = feeStructureSlotType[slot.type];

        const fee = calculateFee(vehicle);

        const expectedFee = calculateExceedingDays({
            flatRateFee: feeFlatRate,
            suceedingPerHour: feeStructure.suceedingPerHour,
            difference:  Math.abs(difference),
            exceedingPerDay: feeStructure.exceedingPerDay
        });

        expect(fee).toBe(expectedFee);
    });
});
