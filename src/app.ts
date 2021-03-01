import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'typescript-rest';
import mongoose from 'mongoose';
import {runParkingLotSystem} from "./service";


const url = `mongodb+srv://SquadStack:RHdadI5oi7zmJ81F@cluster0.prwak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

const app: Application = express();
app.use(bodyParser.json());

Server.buildServices(app);

// trigger point to excute the file
app.get('/', runParkingLotSystem);

// this will host web server on http://localhost:5000/
app.listen(5000, () => console.log('server running at port: 5000 ...'));
