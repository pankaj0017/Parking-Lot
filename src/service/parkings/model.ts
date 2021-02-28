import mongoose from 'mongoose';

const ParkingSchema = new mongoose.Schema({
    vehicleRegistrationPlate: String,
    ageOfDriver: Number,
    slotNumber: Number,
    isParked: Boolean
});

export const Parking = mongoose.model('parkings', ParkingSchema);

