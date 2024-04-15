// Test: MongoDB Connection

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('MongoDB Connection', () => {
  let mongoServer;
  let client;
  let db;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    db = client.db('test_database');
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  test('should connect to the MongoDB in-memory server', async () => {
    expect(client).toBeDefined();
    
    expect(client).toBeTruthy();
  });

  test('should insert and retrieve data from MongoDB', async () => {
    const collection = db.collection('resorts');

    const resort = {
      resort_name: 'Aspen Snowmass',
      city: 'Aspen',
      country: 'United States',
      resort_type: 'Ski Resort',
      summary: 'Aspen Snowmass is one of the premier ski destinations in the United States...',
      cost: 'High',
      current_rate_usd: 500,
      amenities: ['Skiing', 'Snowboarding', 'Spa', 'Dining', 'Lodging'],
      is_featured: true
    };
    await collection.insertOne(resort);

    const insertedResort = await collection.findOne({ resort_name: 'Aspen Snowmass' });

    expect(insertedResort).toEqual(resort);
  });
});

