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
const {createAccount, login, pollCompletedRides, 
getNearbyRides, createDriverInfo, getNumRiders,
completeRide, removeRiderRequest, markRideAsActive, grabActiveRide,
deletePendingRiders, getPendingRideByRide,
riderPickedUp, ridesAwaitingPickup} = require('../api/database_functions/queries');


  describe('*createAccount function*', () => {
    it('attempt to create an account into the database', (done) => {
        // Test data
        const testUserId = 100;
        const testUsername = 'aofilan0';
        const testEmail = 'aofilan0@ucsc.edu';
        const testPassword = 'hello';
        const testPhone = '7073982078';
        const testFirstName = 'Andrei ';
        const testLastName = 'Ofilan';

        createAccount(connection, testUserId, testUsername, testEmail, 
          testPassword, testPhone, testFirstName, testLastName, (err, result) => {
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
        const testUsername = 'aofilan0';
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

describe('*pollCompletedRides function*', () => {
  it('should poll completed rides without errors', (done) => {
    // Test data
    const userId = 55;

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

describe('*Get Nearby Rides function*', () => {
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

describe('*pollCompletedRides function*', () => {
  it('should poll completed rides without errors', (done) => {
    // Test data
    const testrideid = 67;

    // Call the pollCompletedRides function
    getNumRiders(connection, testrideid)
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

describe('*create Driver Info function*', () => {
  it('attempt to create a new driver into the database', (done) => {
      // Test data
      const testdriverId = 100;
      const testCarmodel = '3201';
      const testlicensePlate = '12345';
      const testlicense = '98722';
      const testcarMake = 'BMW';
      const testcarYear = '2017 ';
      const testseatCount = '5';
      const testcarColor = 'brown';
      const driverPicture = '';
      const insurance = '5678';
      const residency = 'C9 ';
      const inspectionForm = '';

      
      // Use await to wait for the asynchronous operation to complete
      createDriverInfo(connection, testdriverId, testCarmodel,
        testlicensePlate, testlicense, testcarMake, testcarYear, testseatCount,
        testcarColor, driverPicture, insurance, residency,inspectionForm)
  
      .then((result) => {
        // Print the result
        console.log('Given Response:', result);

        // Done with the test
        done();
      })
      .catch((err) => {
        // Print the error
        console.error('Given Error:', err);

        // Fail the test if an error occurs
        done(err);
      });
  });
});

describe('*Delete Pending Rides function*', () => {
  it('should delete Pending Rides without errors', (done) => {
    // Test data
    const testrideid = 67;

    deletePendingRiders(connection, testrideid)
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

describe('*Pending Ride by Ride function*', () => {
  it('should show pending rides without errors', (done) => {
    // Test data
    const testrideid = 67;

    getPendingRideByRide(connection, testrideid)
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

describe('*Mark Rider as Active function*', () => {
  it('should mark rider as active without errors', (done) => {
    // Test data
    const testuserid = 100;
    const testrideid = 67;

    markRideAsActive(connection, testuserid, testrideid)
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

describe('grabActiveRide function', () => {
  it('should grab active rides without errors', (done) => {
    // Test data
    const testdriverid = 100;

    grabActiveRide(connection, testdriverid)
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

describe('*Remove Rider function*', () => {
  it('should remove rider request without errors', (done) => {
    // Test data
    const testuserid = 100;
    const testrideid = 67;

    removeRiderRequest(connection, testuserid, testrideid)
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

describe('*complete rider function*', () => {
  it('should complete ride without errors', (done) => {
    // Test data
    const testrideid = 67;

    completeRide(connection, testrideid)
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

describe('*riderPickedUp function*', () => {
  it('should count the amount of riders picked without errors', (done) => {
    // Test data
    const testrideid = 67;

    riderPickedUp(connection, testrideid)
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

describe('*ridesAwaitingPickup function*', () => {
  it('should count the amount of rides waiting without errors', (done) => {
    // Test data
    const testrideid = 67;

    ridesAwaitingPickup(connection, testrideid)
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

const deleteDriver = (connection, userid) => {
  return new Promise((resolve, reject) => {
      connection.query(
          'DELETE FROM driver_info WHERE driver_id = ?',
          [userid],
          (err, resp) => {
              if (err) {
                  reject({ status: 'error', message: err.message });
              } else {
                  // Check if any rows were affected to determine success
                  if (resp.affectedRows > 0) {
                      resolve({ status: 'success', message: 'Driver deleted successfully\n' });
                  } else {
                      reject({ status: 'error', message: 'Driver not found\n' });
                  }
              }
          }
      );
  });
};


describe('deleteDriver function', () => {
  it('should delete a driver from the database', async () => {
    // Test data
    const testdriverId = 100;

    try {
      const result = await deleteDriver(connection, testdriverId);
      // Print the result
      console.log('Given Response', result);
    } catch (err) {
      // Print the error
      console.error('Given Error:', err);
      // Fail the test if an error occurs
      throw err;
    }
  });
});

describe('deleteAccount function', () => {
  it('should delete an account from the database', async () => {
      // Test data
      const testUserId = 100;

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

