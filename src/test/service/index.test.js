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

            MockSlotsDM.removeSlots.mockImplementationOnce = jest.fn().mockReturnValueOnce([]);
            MockParkingDM.removeParkings.mockImplementationOnce = jest.fn().mockReturnValueOnce([]);
            MockSlotsDM.createSlots.mockImplementationOnce = jest.fn().mockReturnValueOnce([]);

            const executeCommandLineResponse = await executeCommandLine('create_parking_lot 6');
            expect(MockSlotsDM.createSlots).toHaveBeenCalledTimes(1);
            expect(MockSlotsDM.createSlots).toHaveBeenCalledWith(6);
            expect(executeCommandLineResponse).toBe('Created Parking lot of size 6.');
        })
    });
});
