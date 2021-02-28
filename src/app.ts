import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Server } from 'typescript-rest';
import mongoose from 'mongoose';
import * as fs from "fs";
import * as es from 'event-stream';
import * as _ from "lodash";


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

const addToLogs = (logs: string, line: string) => {
    if (_.isEmpty(line)) return logs;
    return logs.concat(line) + '<br><br>';
};

const executeLine = (line: string) => {
    return 'ok';
};

app.get('/', (req: Request, res: Response) => {
    let logs: string = '';
    const s = fs.createReadStream('file.txt')
        .pipe(es.split())
        .pipe(es.mapSync(function(line: string) {
                s.pause();
                logs = addToLogs(logs, line);
                addToLogs(logs, executeLine(line));
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
});

app.listen(5000, () => console.log('server running at port: 5000 ...'));
