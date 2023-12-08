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
const {createAccount, login, pollCompletedRides, getNearbyRides} = require('../api/database_functions/queries');


/*describe('*createAccount function*', () => {
    it('attempt to create an account into the databse', (done) => {
      // Test data
      const testUserId = 50;
      const testUsername = 'aofilan2';
      const testEmail = 'aofilan2@ucsc.edu';
      const testPassword = 'hello';
      const testPhone = '7073981278';
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
  }); */

  describe('*createAccount function*', () => {
    it('attempt to create an account into the database', (done) => {
        // Test data
        const testUserId = 52;
        const testUsername = 'aofilan3';
        const testEmail = 'aofilan3@ucsc.edu';
        const testPassword = 'hello';
        const testPhone = '7073981678';
        const testFirstName = 'Andrei ';
        const testLastName = 'Ofilan';

        createAccount(connection, testUserId, testUsername, testEmail, testPassword, testPhone, testFirstName, testLastName, (err, result) => {
            // Check for errors
            if (err) {
                // Fail the test if there is an error
                done(err);
            } else {
                // Print the result
                console.log('Given Response:', result);

                // Done with the test
                done();
            }
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
      done();
    });
  });
}); 

describe('Get Nearby Rides function', () => {
  it('should be able to find nearby rides without errors', (done) => {
    // Test data
    const user_point = 0;
    const maxPrice = 8.00;

    getNearbyRides(connection, user_point, maxPrice)
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


const deleteAccount = (connection, userid) => {
  return new Promise((resolve, reject) => {
      connection.query(
          'DELETE FROM account WHERE user_id = ?',
          [userid],
          (err, resp) => {
              if (err) {
                  reject({ status: 'error', message: err.message });
              } else {
                  // Check if any rows were affected to determine success
                  if (resp.affectedRows > 0) {
                      resolve({ status: 'success', message: 'Account deleted successfully\n' });
                  } else {
                      reject({ status: 'error', message: 'Account not found\n' });
                  }
              }
          }
      );
  });
};

describe('deleteAccount function', () => {
  it('should delete an account from the database', async () => {
      // Test data
      const testUserId = 51;

      try {
          const result = await deleteAccount(connection, testUserId);
          // Print the result
          console.log('Given Response', result);
      } catch (err) {
          // Print the error
          console.error('Given Error:', err);
          // Fail the test if an error occurs
          throw err;
      } finally {
          // Close the connection after the test
          connection.end();
      }
  });
});

//const userid = 50;

/*deleteAccount(connection, userid, (err, result) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Result:', result);
    }
});*/


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

