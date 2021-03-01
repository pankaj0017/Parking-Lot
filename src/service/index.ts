import * as _ from "lodash";
import {createSlots, getAvailableSlotNumber, removeSlots, updateSlotAvailability} from "./slots";
import {Request, Response} from "express";
import * as fs from "fs";
import * as es from "event-stream";
import {
    getCurrentParkingInfoBySlotNumber,
    getCurrentParkingInfoByVehicleNumberPlate,
    getCurrentParkingsOfDriversOfGivenAge, leaveTheSlot,
    parkTheVehicle, removeParkings
} from "./parkings";

// this will clear old entries and create a new parking lot of given size
const createParkingLot = async (slotCapacity: number): Promise<string> => {
    await removeSlots();
    await removeParkings();
    await createSlots(slotCapacity);
    return `Created parking of ${slotCapacity} slots`;
};

// this will park the vehicle to closest available slot. if no slot available then it will return Parking full message
const parkVehicle = async (vehicleRegistrationPlate: string, ageOfDriver: number): Promise<string> => {
    const availableSlot: any = await getAvailableSlotNumber();

    if (_.isNil(availableSlot)) return 'Parking is full. No slot empty.';
    await updateSlotAvailability(availableSlot, false);
    await parkTheVehicle(availableSlot, vehicleRegistrationPlate, ageOfDriver);
    return `Car with vehicle registration number "${vehicleRegistrationPlate}" has been parked at slot number ${availableSlot}`;
};

// to fetch all the slots where drive of given age have parked
const getSlotsNumberOfDriverOfAge = async (ageOfDriver: number): Promise<string> => {
    const parkingDetails = await getCurrentParkingsOfDriversOfGivenAge(ageOfDriver);
    return `${_.map(parkingDetails, 'slotNumber').join(',')}`;
};

// to fetch the slot where given vehicle is parked
const getSlotNumberForCarWithNumberPlate = async (vehicleRegistrationPlate: string): Promise<string> => {
    const parkingInfo = await getCurrentParkingInfoByVehicleNumberPlate(vehicleRegistrationPlate);
    if (_.isNil(parkingInfo)) return `No such car present in parking lot.`;
    return `${_.get(parkingInfo, 'slotNumber')}`;
};

// remove the vehicle from the slot
const leaveTheParkingSlot = async (slot: number): Promise<string> => {
    const parkingInfo = await getCurrentParkingInfoBySlotNumber(slot);
    if (_.isNil(parkingInfo)) return `Slot ${slot} is already vacant.`;
    await updateSlotAvailability(slot, true);
    await leaveTheSlot(slot);
    return `Slot ${slot} is vacant now.`
};

// to fetch all the vehicle registration plate where drive of given age have parked
const getVehicleRegistrationNumberForDriverOfAge = async (ageOfDriver: number): Promise<string> => {
    const parkingDetails = await getCurrentParkingsOfDriversOfGivenAge(ageOfDriver);
    return `${_.map(parkingDetails, 'vehicleRegistrationPlate').join(',')}`;
};

// execute the line with respective controller
export const executeCommandLine = async (line: string): Promise<string> => {
    if (_.isEmpty(line)) return '';
    const input = line.split(' ');
    switch (input[0]) {
        case 'Create_parking_lot':
            return await createParkingLot(parseInt(input[1]));
        case 'Park':
            return await parkVehicle(input[1], parseInt(input[3]));
        case 'Slot_numbers_for_driver_of_age':
            return await getSlotsNumberOfDriverOfAge(parseInt(input[1]));
        case 'Slot_number_for_car_with_number':
            return await getSlotNumberForCarWithNumberPlate(input[1]);
        case 'Leave':
            return await leaveTheParkingSlot(parseInt(input[1]));
        case 'Vehicle_registration_number_for_driver_of_age':
            return await getVehicleRegistrationNumberForDriverOfAge(parseInt(input[1]));
        default:
            return 'Wrong input. Please use small case letters and verify input';
    }
};

// to send response to web page localhost:5000
const addToLogs = (logs: string, line: string) => {
    if (_.isEmpty(line)) return logs;
    return logs.concat(line) + '<br><br>';
};


// this will read the file line by line and execute them
export const runParkingLotSystem = (req: Request, res: Response) => {
    let logs: string = '';
    const s = fs.createReadStream('file.txt')
        .pipe(es.split())
        .pipe(es.mapSync(async function(line: string) {
                s.pause();
                let output = await executeCommandLine(line);
                console.log(line);
                console.log(output);
                logs = addToLogs(logs, line);
                logs = addToLogs(logs, output);
                s.resume();
            })
                .on('error', function(err: any) {
                    console.log('Error:', err);
                })
                .on('end', function() {
                    console.log('Finish reading.');
                    res.send(logs);
                })
        );
};
