// load the logEvents module
const logEvents = require('./logEvents.js');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

global.DEBUG = true;

const { format, getYear, getTime } = require('date-fns');
const fsPromises = require('fs').promises;
const path = require('path');

test('Entry was successfully added to log file', async () => {
  // grab the timestamp and include with msg text
  const currTimeMsg = 'This test event occured at ' + getTime(new Date());
  // write the log entry
  myEmitter.emit('log', 'http://localhost', 'TEST', currTimeMsg);
  // read the file for specific msg text
  const logsFolder = 'logs/' + getYear(new Date());
  const fileName = `${format(new Date(), 'yyyyMMdd')}` + '_http_events.log';
  const contents = await fsPromises.readFile(path.join(__dirname, logsFolder, fileName),'utf-8');
  expect(contents.includes(currTimeMsg)).toBeTruthy();
});