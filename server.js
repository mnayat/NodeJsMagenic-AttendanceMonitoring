// main entry point of the application
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fs = require('fs/promises');
//load env variables
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

// routes files
const events = require('./routes/events');
const members = require('./routes/members');
const attendance = require('./routes/attendances');
//logger
const logger  = require('./middleware/logger')

const app = express();



const loggerCreator = new logger();

const addTimeStampHandler = async (data) => {
    const currentDateTime = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
    await fs.appendFile(`./logs/${data.filename}.txt`, `\n\n${currentDateTime} `);
    console.log('Timestamp added.');
};
loggerCreator.on('logCreated',addTimeStampHandler);
//
app.use(express.json());

app.use(loggerCreator.logger);

//mount Router
app.use('/api/events',events);
app.use('/api/members',members);

app.use('/api/attendance',attendance);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} ,mode on port ${PORT}`.yellow.bold)
);

// handle unhandled rejections
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`.red);
    //Close server and exit process;
    server.close(()=> process.exit(1));
});