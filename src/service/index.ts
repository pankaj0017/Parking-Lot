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

const createParkingLot = async (slotCapacity: number): Promise<string> => {
    await removeSlots();
    await removeParkings();
    await createSlots(slotCapacity);
    return `Created Parking lot of size ${slotCapacity}.`;
};

const parkVehicle = async (vehicleRegistrationPlate: string, ageOfDriver: number): Promise<string> => {
    const availableSlot: any = await getAvailableSlotNumber();

    if (_.isNil(availableSlot)) return 'Parking is full. No slot empty.';
    await updateSlotAvailability(availableSlot, false);
    await parkTheVehicle(availableSlot, vehicleRegistrationPlate, ageOfDriver);
    return `Vehicle ${vehicleRegistrationPlate} has been parked on slot ${availableSlot}. Age of Driver ${ageOfDriver}.`;
};

const getSlotsNumberOfDriverOfAge = async (ageOfDriver: number): Promise<string> => {
    const parkingDetails = await getCurrentParkingsOfDriversOfGivenAge(ageOfDriver);
    return `Slots are ${_.map(parkingDetails, 'slotNumber').join(', ')}.`;
};

const getSlotNumberForCarWithNumberPlate = async (vehicleRegistrationPlate: string): Promise<string> => {
    const parkingInfo = await getCurrentParkingInfoByVehicleNumberPlate(vehicleRegistrationPlate);
    if (_.isNil(parkingInfo)) return `No such car present in parking lot.`;
    return `Vehicle ${vehicleRegistrationPlate} is present on slot ${_.get(parkingInfo, 'slotNumber')}.`;
};

const leaveTheParkingSlot = async (slot: number): Promise<string> => {
    const parkingInfo = await getCurrentParkingInfoBySlotNumber(slot);
    if (_.isNil(parkingInfo)) return `Slot ${slot} is already vacant.`;
    await updateSlotAvailability(slot, true);
    await leaveTheSlot(slot);
    return `Slot ${slot} is vacant now.`
};

const getVehicleRegistrationNumberForDriverOfAge = async (ageOfDriver: number): Promise<string> => {
    const parkingDetails = await getCurrentParkingsOfDriversOfGivenAge(ageOfDriver);
    return `Vehicle Registration Number of driver of age ${ageOfDriver} are ${_.map(parkingDetails, 'vehicleRegistrationPlate').join(', ')}.`;
};


export const executeCommandLine = async (line: string): Promise<string> => {
    if (_.isEmpty(line)) return '';
    const input = line.split(' ');
    switch (input[0]) {
        case 'create_parking_lot':
            return await createParkingLot(parseInt(input[1]));
        case 'park':
            return await parkVehicle(input[1], parseInt(input[3]));
        case 'slots_number_for_driver_of_age':
            return await getSlotsNumberOfDriverOfAge(parseInt(input[1]));
        case 'slots_number_for_car_with_number':
            return await getSlotNumberForCarWithNumberPlate(input[1]);
        case 'leave':
            return await leaveTheParkingSlot(parseInt(input[1]));
        case 'vehicle_registration_number_for_driver_of_a_age':
            return await getVehicleRegistrationNumberForDriverOfAge(parseInt(input[1]));
        default:
            return 'Wrong input. Please use small case letters and verify input';
    }
};

const addToLogs = (logs: string, line: string) => {
    if (_.isEmpty(line)) return logs;
    return logs.concat(line) + '<br><br>';
};

export const runParkingLotSystem = (req: Request, res: Response) => {
    let logs: string = '';
    const s = fs.createReadStream('file.txt')
        .pipe(es.split())
        .pipe(es.mapSync(async function(line: string) {
                s.pause();
                logs = addToLogs(logs, line);
                logs = addToLogs(logs, await executeCommandLine(line));
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
