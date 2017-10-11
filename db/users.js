const User = require('./init').User

/*
  getUser - finds a user in the database with given parameter
  param username - String - the unique name of the user to be pulled from the db
  returns - Promise - returns user entry upon resolve, rejects with error otherwise
 */
function getUser (username) {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }, (err, entry) => {
      if (err) {
        return reject(err)
      }
      else if (typeof(username) === undefined) {
        return reject(new Error('ERROR: Attempted to pass an undefined object into getUser() function'))
      }
      return resolve(entry)
    })
  })
}

module.exports = {
  getUser: getUser
}
