import {Parking} from "./model";

export const removeParkings = async () => {
    await Parking.remove();
};

// this will create a new parking entry
export const parkTheVehicle = async (slotNumber: number, vehicleRegistrationPlate: string, ageOfDriver: number) => {
    return await Parking.create({slotNumber, vehicleRegistrationPlate, ageOfDriver, isParked: true});
};

// this will return parking info by slot number
export const getCurrentParkingInfoBySlotNumber = async (slotNumber: number) => {
    return await Parking.findOne({isParked: true, slotNumber});
};

//  this will return parking info by vehicle registration number
export const getCurrentParkingInfoByVehicleNumberPlate = async (vehicleRegistrationPlate: string) => {
    return await Parking.findOne({isParked: true, vehicleRegistrationPlate});
};

// to get all the parkings details of driver of given age
export const getCurrentParkingsOfDriversOfGivenAge = async (ageOfDriver: number) => {
    return await Parking.find({isParked: true, ageOfDriver});
};

// vacant the slot
export const leaveTheSlot = async (slotNumber: number) => {
    return await Parking.update({slotNumber}, {$set: {isParked: false}});
};
