// Core packages required: 
const fs = require('fs');
const fsPromises = require('fs').promises; 
const path = require('path'); 

const EventEmitter = require('events'); 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter(); 


// Additional packages downloaded: 
const { v4: uuid } = require('uuid'); 
const { format, getYear } = require('date-fns'); 



// myEmitter set up for various 'errors' (404, 503, userLogins): 
// An event is triggered and a message sent to both the console and the 'logs' directory. 

myEmitter.on('error404', (url) => {
    setUpDirectories('error404Logs', url); 
    }
); 


myEmitter.on('error503', (url) => {
    setUpDirectories('error503Logs', url); 
    }
); 

myEmitter.on('errorUserLogins', (url) => {
    setUpDirectories('errorUserLogins', url); 
    }
); 



// An async function that sets up an organized directory (if it does not already exist) to log the 'error' and 'routes' events triggered. 

async function setUpDirectories(directoryType, url) {

    // Dates needed for logging: 
    const onDate = new Date(); 
    const onYear = getYear(new Date()).toString(); 
    const onMonthDay = format(new Date(), 'LLLdd').toString(); 
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

    const currFolder = path.join(__dirname, 'logs', onYear, directoryType); 
    const logItem = `${dateTime}\t${directoryType}\t${url}\t${uuid()}`;

try {
    // Create the 'logs' folder - if it does not already exist 
    if(DEBUG) console.log(`Route Event on: ${url} at ${onDate}`); 
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
       await fsPromises.mkdir(path.join(__dirname, 'logs'));
       if(DEBUG) console.log(`Directory 'logs' created`); 
    }; 
   
    // Create the current year folder inside the 'logs' folder - if it does not already exist 
    if(!fs.existsSync(path.join(__dirname, 'logs', onYear))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs', onYear));
            if(DEBUG) console.log(`Directory ${onYear} created`); 
        };

    // Create the directory type folder ('errorLogs' or 'routeLogs') inside the year folder - if it does not already exist 
    if(!fs.existsSync(path.join(__dirname, 'logs', onYear, directoryType))) {
        if(DEBUG) console.log(currFolder); 
        await fsPromises.mkdir(path.join(__dirname, 'logs', onYear, directoryType)); 
        if(DEBUG) console.log (`Directory 'logs/${onYear}/${directoryType}' created`); 
    }; 

    if(DEBUG) console.log(logItem); 

    // Create (or append to) a file with the logs of events triggered 
    // File naming convention - mmmdd (ex. Feb09) 
    const fileName = onMonthDay; 
    await fsPromises.appendFile(path.join(currFolder, fileName), logItem + '\n');
    
} catch (error) {
    console.log(error); 
}
}; 


module.exports = {
    myEmitter, 
}

