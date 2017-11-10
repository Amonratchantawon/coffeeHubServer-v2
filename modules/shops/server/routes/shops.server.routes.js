'use strict';

/**
 * Module dependencies
 */
var shopsPolicy = require('../policies/shops.server.policy'),
  core = require('../../../core/server/controllers/core.server.controller'),
  shops = require('../controllers/shops.server.controller');

module.exports = function (app) {
  // Shops Routes
  app.route('/api/shops').all(shopsPolicy.isAllowed)
    .get(shops.list)
    .post(core.requiresLoginToken, shops.create);

  app.route('/api/shops/:shopId').all(shopsPolicy.isAllowed)
    .get(shops.read)
    .put(core.requiresLoginToken, shops.update)
    .delete(shops.delete);

  // Finish by binding the Shop middleware
  app.param('shopId', shops.shopByID);
};
