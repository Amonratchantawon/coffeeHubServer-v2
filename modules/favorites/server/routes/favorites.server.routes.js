'use strict';

/**
 * Module dependencies
 */
var favoritesPolicy = require('../policies/favorites.server.policy'),
  core = require('../../../core/server/controllers/core.server.controller'),
  favorites = require('../controllers/favorites.server.controller');

module.exports = function (app) {
  // Favorites Routes
  app.route('/api/favorites').all(core.requiresLoginToken, favoritesPolicy.isAllowed)
    .get(favorites.list)
    .post(favorites.create);

  app.route('/api/favorites/:favoriteId').all(core.requiresLoginToken, favoritesPolicy.isAllowed)
    .get(favorites.read)
    .put(favorites.update)
    .delete(favorites.delete);

  // Finish by binding the Favorite middleware
  app.param('favoriteId', favorites.favoriteByID);
};
