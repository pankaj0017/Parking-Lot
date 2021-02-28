import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
    slotNumber: Number,
    isAvailable: Boolean
});

export const Slot = mongoose.model('slots', SlotSchema);

