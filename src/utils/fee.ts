import { SlotTypes } from "store/complex/slot";
import { Vehicle } from "store/complex/vehicle";

import differenceInHours from 'date-fns/differenceInHours'

const feeFlatRate = 40;
const feeOvernightRate = 5000;

const feeStructureSlotType = {
    [SlotTypes.SP]: {
        firstThreeHours: feeFlatRate,
        suceedingPerHour: 20,
        exceedingPerDay: feeOvernightRate
    },
    [SlotTypes.MP]: {
        firstThreeHours: feeFlatRate,
        suceedingPerHour: 60,
        exceedingPerDay: feeOvernightRate
    },
    [SlotTypes.LP]: {
        firstThreeHours: feeFlatRate,
        suceedingPerHour: 100,
        exceedingPerDay: feeOvernightRate
    }
}

interface CalculateExceedingHours {
    flatRateFee: number,
    suceedingPerHour: number,
    difference: number
}

interface CalculateExceedingDays extends CalculateExceedingHours {
    exceedingPerDay: number
}

const calculateExceedingHours = ({ flatRateFee, suceedingPerHour, difference }: CalculateExceedingHours) => {
    const fee = flatRateFee + (suceedingPerHour * difference);
    return fee
}

const calculateExceedingDays = ({ flatRateFee, suceedingPerHour, difference, exceedingPerDay }: CalculateExceedingDays) => {
    const exceedingHoursInADay = difference % 24;
    const daysParked = Math.round(difference / 24);

    const fee = flatRateFee + (exceedingPerDay * daysParked) + (suceedingPerHour * exceedingHoursInADay)

    return fee
}

const calculateFee = (_vehicle: Vehicle) => {
    let fee = feeFlatRate;
    const timeNow = new Date();
    const difference = differenceInHours(timeNow, new Date(_vehicle.timeIn));

    const slotType = _vehicle.slot?.type;

    if (!slotType) {
        return fee
    }

    let feeStructure = feeStructureSlotType[slotType];

    if (difference >= 3 && difference <= 23) {
        fee = calculateExceedingHours({
            flatRateFee: feeFlatRate,
            suceedingPerHour: feeStructure.suceedingPerHour,
            difference,
        });

    } else if (difference >= 24) {
        fee = calculateExceedingDays({
            flatRateFee: feeFlatRate,
            suceedingPerHour: feeStructure.suceedingPerHour,
            difference,
            exceedingPerDay: feeStructure.exceedingPerDay
        })
    }

    return fee;

}

export {
    calculateFee,
    feeFlatRate,
    feeStructureSlotType,
    calculateExceedingHours,
    calculateExceedingDays
}