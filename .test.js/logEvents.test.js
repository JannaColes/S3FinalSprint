// logEvents.test.js
const fs = require('fs');
const logEvents = require('../logEvents'); // Adjust the path according to your file structure

describe('logEvents', () => {
  it('should log an event to a file', () => {
    const event = 'test event';
    const filename = 'events.log';

    logEvents(event, filename);

    const content = fs.readFileSync(filename, 'utf8');
    expect(content).toContain(event);

    // Clean up
    fs.unlinkSync(filename);
  });
});
