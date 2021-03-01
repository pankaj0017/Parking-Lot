# Parking-Lot
Creating a parking lot system

Please update the command in file.txt

using node v12.4.0 (npm v6.14.4)

1. download node(npm includes) from https://nodejs.org/en/download/'

2. run 'npm i'

if above command failed then try
 * Run 'npm get registry'. If the output is anything other than ‘https://registry.npmjs.org/’, then run
   'npm config set registry https://registry.npmjs.org/' , remove node_modules and package-lock and try running 'npm i' again
 * npm cache clean --force
 * npm rebuild

3. run 'npm run dev' to start

if fails
* npm uninstall -g typescript
* npm install typescript --save-dev
* run './node_modules/.bin/tsc' or 'tsc'
* run 'node dist/app.js'


4. open browser and visit http://localhost:5000/
5. to check test coverage run 'jest --coverage' in terminal


result:
pankajjaiswal@UCLP1717 Parking-Lot (pankaj/parkingLot) $ jest --coverage
 PASS  src/test/service/index.test.js
  Tests for Parking Lot
    Test for slots
      ✓ should generate slots correctly (3 ms)
      ✓ should park vehicle and store driver age (1 ms)
      ✓ should return slot numbers for driver of age 21 (1 ms)
      ✓ should return slot number for car
      ✓ should leave the parking slot (1 ms)
      ✓ should return vehicle registration numbers for driver of age 18

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   75.71 |    58.82 |   73.68 |   78.57 |                   
 index.ts |   75.71 |    58.82 |   73.68 |   78.57 | 71,76-77,81-95    
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total


result on Web:

Create_parking_lot 6

Created parking of 6 slots

Park KA-01-HH-1234 driver_age 21

Car with vehicle registration number "KA-01-HH-1234" has been parked at slot number 1

Park PB-01-HH-1234 driver_age 21

Car with vehicle registration number "PB-01-HH-1234" has been parked at slot number 2

Slot_numbers_for_driver_of_age 21

1,2

Park PB-01-TG-2341 driver_age 40

Car with vehicle registration number "PB-01-TG-2341" has been parked at slot number 3

Slot_number_for_car_with_number PB-01-HH-1234

2

Slot_number_for_car_with_number PB-01-HH-0000

No such car present in parking lot.

Leave 2

Slot 2 is vacant now.

Leave 4

Slot 4 is already vacant.

Park HR-29-TG-3098 driver_age 39

Car with vehicle registration number "HR-29-TG-3098" has been parked at slot number 2

Vehicle_registration_number_for_driver_of_age 18



