jest.mock("../../service/slots", () => {
    return {
        removeSlots: jest.fn(),
        createSlots: jest.fn(),
        getAvailableSlotNumber: jest.fn(),
        updateSlotAvailability: jest.fn()
    }
});
jest.mock("../../service/parkings", () => {
    return {
        removeParkings: jest.fn(),
        parkTheVehicle: jest.fn(),
        getCurrentParkingInfoBySlotNumber: jest.fn(),
        getCurrentParkingInfoByVehicleNumberPlate: jest.fn(),
        getCurrentParkingsOfDriversOfGivenAge: jest.fn(),
        leaveTheSlot: jest.fn()
    }
});

let executeCommandLine = require("../../service").executeCommandLine;

let MockSlotsDM = require('../../service/slots');
let MockParkingDM = require('../../service/parkings');
/*

*/
beforeEach(() => {
    jest.resetAllMocks();
    jest.setTimeout(30000);
});

describe("Tests for Parking Lot", () => {

    describe("Test for slots", () => {

        it('should generate slots correctly', async function () {

            const executeCommandLineResponse = await executeCommandLine('create_parking_lot 6');
            expect(MockSlotsDM.createSlots).toHaveBeenCalledTimes(1);
            expect(MockSlotsDM.createSlots).toHaveBeenCalledWith(6);
            expect(executeCommandLineResponse).toBe('Created Parking lot of size 6.');
        });

        it('should park vehicle and store driver age', async function () {

            MockSlotsDM.getAvailableSlotNumber = jest.fn().mockReturnValueOnce(1);

            const executeCommandLineResponse = await executeCommandLine('park KA-01-HH-1234 driver_age 21');
            expect(MockSlotsDM.getAvailableSlotNumber).toHaveBeenCalledTimes(1);
            expect(MockParkingDM.parkTheVehicle).toHaveBeenCalledTimes(1);
            expect(MockSlotsDM.updateSlotAvailability).toHaveBeenCalledWith(1, false);
            expect(MockSlotsDM.updateSlotAvailability).toHaveBeenCalledTimes(1);
            expect(executeCommandLineResponse).toBe('Vehicle KA-01-HH-1234 has been parked on slot 1. Age of Driver 21.');
        });

        it('should return slot numbers for driver of age 21', async function () {

            MockParkingDM.getCurrentParkingsOfDriversOfGivenAge = jest.fn().mockReturnValueOnce([
                {slotNumber: 1}, {slotNumber: 2}
                ]);

            const executeCommandLineResponse = await executeCommandLine('slots_number_for_driver_of_age 21');
            expect(MockParkingDM.getCurrentParkingsOfDriversOfGivenAge).toHaveBeenCalledTimes(1);
            expect(MockParkingDM.getCurrentParkingsOfDriversOfGivenAge).toHaveBeenCalledWith(21);
            expect(executeCommandLineResponse).toBe('Slots are 1, 2.');
        });

        it('should return slot number for car', async function () {

            MockParkingDM.getCurrentParkingInfoByVehicleNumberPlate = jest.fn().mockReturnValueOnce({slotNumber: 2});

            const executeCommandLineResponse = await executeCommandLine('slots_number_for_car_with_number PB-01-HH-1234');
            expect(MockParkingDM.getCurrentParkingInfoByVehicleNumberPlate).toHaveBeenCalledTimes(1);
            expect(MockParkingDM.getCurrentParkingInfoByVehicleNumberPlate).toHaveBeenCalledWith('PB-01-HH-1234');
            expect(executeCommandLineResponse).toBe('Vehicle PB-01-HH-1234 is present on slot 2.');
        });

        it('should leave the parking slot', async function () {

            MockParkingDM.getCurrentParkingInfoBySlotNumber = jest.fn().mockReturnValueOnce({slotNumber: 2});

            const executeCommandLineResponse = await executeCommandLine('leave 2');
            expect(MockParkingDM.getCurrentParkingInfoBySlotNumber).toHaveBeenCalledTimes(1);
            expect(MockParkingDM.getCurrentParkingInfoBySlotNumber).toHaveBeenCalledWith(2);
            expect(executeCommandLineResponse).toBe('Slot 2 is vacant now.');
        });

        it('should return vehicle registration numbers for driver of age 18', async function () {

            MockParkingDM.getCurrentParkingsOfDriversOfGivenAge = jest.fn().mockReturnValueOnce([]);

            const executeCommandLineResponse = await executeCommandLine('vehicle_registration_number_for_driver_of_a_age 18');
            expect(MockParkingDM.getCurrentParkingsOfDriversOfGivenAge).toHaveBeenCalledTimes(1);
            expect(MockParkingDM.getCurrentParkingsOfDriversOfGivenAge).toHaveBeenCalledWith(18);
            expect(executeCommandLineResponse).toBe('Vehicle Registration Number of driver of age 18 are .');
        });

    });
});
