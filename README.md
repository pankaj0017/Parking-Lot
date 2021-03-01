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

