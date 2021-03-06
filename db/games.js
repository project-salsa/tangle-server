const Game = require('./init').Game

/**
 * Gets a game by its name, which is a unique value so there should only be one
 * @param name - String - name of the game to retrieve
 * @return {Promise}
 */
function getGame (name) {
  return new Promise((resolve, reject) => {
    if (name === null || typeof name === 'undefined') {
      return reject(new Error('Please supply a valid game title'))
    }
    Game.find({ name: name }, (err, entry) => {
      if (err) {
        return reject(err)
      } else if (typeof entry === 'undefined') {
        return reject(new Error('Attempted to pass an undefined object into getGame() function'))
      } else if (entry.length > 1) {
        console.log('Warning: Multiple instances of the game "' + name + '" exist in the database')
      }
      return resolve(entry[0])
    })
  })
}

/**
 * createGame - creates a new game in the DB based on parameters
 * @param name - String - name of the game
 * @param iconUrl - String -link to the icon used for the game
 * @param bannerUrl - String - link to the banner used for the game
 * @param genres - [String] - all of the genres of the game
 * @param platforms - [String] - available platforms the game is playable on
 * @returns {Promise} - resolves with data if successful, rejects with err if not
 */
function createGame (name, iconUrl, bannerUrl, genres, platforms) {
  return new Promise((resolve, reject) => {
    Game.create({ name: name, iconUrl: iconUrl, bannerUrl: bannerUrl, genres: genres, platforms: platforms }, function (err, data) {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })
}

/**
 * getGames - Gets all games stored in the database
 * @returns {Promise} - resolves with array of game names if successful, rejects with err if not
 */

function getGames () {
  return new Promise((resolve, reject) => {
    Game.find((err, games) => {
      if (err !== null && typeof err !== 'undefined') {
        return reject(new Error(err))
      }
      return resolve(games)
    })
  })
}

module.exports = {
  createGame,
  getGame,
  getGames
}
