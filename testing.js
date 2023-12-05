// Install required packages:
// npm install mysql mocha chai

const mysql = require('mysql');
const chai = require('chai');
const expect = chai.expect;

// MySQL configuration
const dbConfig = {
  host: '35.185.226.18',
  user: 'member',
  password: 'slugs',
  database: 'Hitch_Database',
};

// Create a MySQL connection pool
const connection = mysql.createPool(dbConfig);

// Function to create an account
const {createAccount} = require('../api/database_functions/queries');

// Testing using Mocha and Chai
describe('createAccount function', () => {
    it('should insert a new account without errors', (done) => {
      // Test data
      const testUserId = 342;
      const testUsername = 'testuser';
      const testEmail = 'test1@example.com';
      const testPassword = 'password123';
      const testPhone = '7322783446';
      const testFirstName = 'John';
      const testLastName = 'Doe';
  
      // Call the createAccount function
      createAccount(connection, testUserId, testUsername, testEmail, testPassword, testPhone, testFirstName, testLastName, (err, result) => {
        // Check for errors
        console.log('Actual Error:', err);
        
        // Check the result
        expect(err).to.be.null;
        // Check the status and response
        expect(result).to.deep.equal({ status: 'success', response: {insertId: '1' } });
  
        // You can add more assertions based on your specific requirements
  
        // Done with the test
        done();
      });
    });
  });

describe('login function', () => {
  it('should log in without errors', async () => {
    // Test data
    const username = 'testuser';
    const password = 'password123';

    // Call the login function
    const result = await login(connection, username, password);

    // Check the result
    expect(result).to.deep.equal(/* your expected result */);
    // Add more assertions if needed
  });
});

describe('pollCompletedRides function', () => {
  it('should poll completed rides without errors', async () => {
    // Test data
    const userId = 1;

    // Call the pollCompletedRides function
    const result = await pollCompletedRides(connection, userId);

    // Check the result
    expect(result).to.deep.equal(/* your expected result */);
    // Add more assertions if needed
  });
});

describe('getNumRiders function', () => {
  it('should get the number of riders without errors', async () => {
    // Test data
    const rideId = 1;

    // Call the getNumRiders function
    const result = await getNumRiders(connection, rideId);

    // Check the result
    expect(result).to.deep.equal(/* your expected result */);
    // Add more assertions if needed
  });
});

// Close the MySQL connection pool after testing
after(() => {
connection.end();
});
