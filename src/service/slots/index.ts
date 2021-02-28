import {Slot} from "./model";
import * as _ from "lodash";

export const removeSlots = async () => {
    await Slot.remove();
};

export const createSlots = async (slotCapacity: number) => {
    const slots = _.range(1, slotCapacity + 1).map(slotNumber => {
        return {slotNumber, isAvailable: true}
    });
    return await Slot.create(slots);
};

export const getAvailableSlotNumber = async () => {
    const slots = await Slot.find({});
    return _.chain(slots).map('slotNumber').min();
};

export const updateSlotAvailability = async (slotNumber: number, isAvailable: boolean) => {
    return await Slot.updateOne({ slotNumber }, { $set: { isAvailable }});
};
