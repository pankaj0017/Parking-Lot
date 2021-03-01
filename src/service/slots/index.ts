import {Slot} from "./model";
import * as _ from "lodash";

export const removeSlots = async () => {
    await Slot.remove();
};

// this will create slots in range 1-n
export const createSlots = async (slotCapacity: number) => {
    const slots = _.range(1, slotCapacity + 1).map(slotNumber => {
        return {slotNumber, isAvailable: true}
    });
    return await Slot.create(slots);
};

// this will return the closest slot number
export const getAvailableSlotNumber = async () => {
    const slots = await Slot.find({ isAvailable: true });
    return _.chain(slots).map('slotNumber').min();
};

// this will update slot availability status
export const updateSlotAvailability = async (slotNumber: number, isAvailable: boolean) => {
    return await Slot.updateOne({ slotNumber }, { $set: { isAvailable }});
};
