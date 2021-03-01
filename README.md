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


