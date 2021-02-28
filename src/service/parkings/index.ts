import {Parking} from "./model";

export const removeParkings = async () => {
    await Parking.remove();
};

export const parkTheVehicle = async (slotNumber: number, vehicleRegistrationPlate: string, ageOfDriver: number) => {
    return await Parking.create({slotNumber, vehicleRegistrationPlate, ageOfDriver, isParked: true});
};

export const getCurrentParkingInfoBySlotNumber = async (slotNumber: number) => {
    return await Parking.findOne({isParked: true, slotNumber});
};

export const getCurrentParkingInfoByVehicleNumberPlate = async (vehicleRegistrationPlate: string) => {
    return await Parking.findOne({isParked: true, vehicleRegistrationPlate});
};

export const getCurrentParkingsOfDriversOfGivenAge = async (ageOfDriver: number) => {
    return await Parking.find({isParked: true, ageOfDriver});
};

export const leaveTheSlot = async (slotNumber: number) => {
    return await Parking.update({slotNumber}, {$set: {isParked: false}});
};
