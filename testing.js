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

const connection = mysql.createPool(dbConfig);
const {createAccount, login, pollCompletedRides} = require('../api/database_functions/queries');

const cleanupTestData = (userId) => {
  // Delete the test account associated with the user ID
  connection.query('DELETE FROM account WHERE user_id=?', [userId], (err, result) => {
    if (err) {
      console.error('Error cleaning up test data:', err);
    } else {
      console.log('Test data cleaned up successfully.');
    }
  });
};



describe('*createAccount function*', () => {
    it('attempt to create an account into the databse', (done) => {
      // Test data
      const testUserId = 64;
      const testUsername = 'aofilan';
      const testEmail = 'aofilan@ucsc.edu';
      const testPassword = 'hello';
      const testPhone = '7073981578';
      const testFirstName = 'Andrei ';
      const testLastName = 'Ofilan';

      createAccount(connection, testUserId, testUsername, testEmail, testPassword, testPhone, testFirstName, testLastName, (err, result) => {
        
        // Check for errors
        console.log('Given Status:', err);

        // Print the result
        console.log('Given Response:', result);

  
        // Done with the test
        done();
      });
    });
  });

  describe('*login function*', () => {
    it('should retrieve user_id without errors', (done) => {

        // Test data
        const testUsername = 'aofilan';
        const testPassword = 'hello';

        // Call the login function
        login(connection, testUsername, testPassword)
            .then((result) => {
                // Print the result
                console.log('Given Response', result);

                // Done with the test
                done();
            })
            .catch((err) => {
                // Print the error
                console.error('Given Error:', err);

                // Done with the test
                done();
            });
    });
});

describe('pollCompletedRides function', () => {
  it('should poll completed rides without errors', (done) => {
    // Test data
    const userId = 64;

    // Call the pollCompletedRides function
    pollCompletedRides(connection, userId)
      .then((result) => {
      // Print the result
      console.log('Given Response', result);

      // Done with the test
      done();
    })
    .catch((err) => {
      // Print the error
      console.error('Given Error:', err);

      // Done with the test
      cleanupTestData(userID); 
      done();
    });
  });
}); 


after((done) => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection pool:', err);
    } else {
      console.log('Connection pool closed successfully.');
    }
    done();
  });
});

