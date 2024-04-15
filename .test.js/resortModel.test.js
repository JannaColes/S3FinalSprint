// This test file is for testing the resort DAL (Data Access Layer) functions.

global.DEBUG = true;
require('dotenv').config();
const { addResort, getResorts, deleteResort } = require('../services/m.resorts.dal'); // Adjust the path to your resort DAL

describe('Resort DAL', () => {
  let newResortId;

  afterAll(async () => {
    
    if (newResortId) {
      try {
        await deleteResort(newResortId);
      } catch (error) {
        console.error('Error cleaning up test resort:', error);
      }
    }
  });

  it('should add a new resort to the database and retrieve it', async () => {
    const resortData = {
      resortName: "Test Resort",
      city: "Test City",
      country: "Test Country",
      resortType: "Ski Resort",
      summary: "A test resort summary",
      cost: "Medium",
      rate: 300,
      amenities: "Pool, Spa, Restaurant",
      isFeatured: true
    };

    // Add a new resort
    newResortId = await addResort(...Object.values(resortData));

    // Wait for a short period before retrieving resorts
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Retrieve resorts
    let resorts;
    try {
      resorts = await getResorts();
    } catch (error) {
      console.error('Error retrieving resorts:', error);
      throw error;
    }

    // Find the added resort
    const foundResort = resorts.find(resort => resort._id.toString() === newResortId.toString());

    expect(foundResort).toBeDefined();
    expect(foundResort.city).toBe("Test City");
    
  }, 10000); 
});
