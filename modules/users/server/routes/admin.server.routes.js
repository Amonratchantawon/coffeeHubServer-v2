'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
  core = require('../../../core/server/controllers/core.server.controller'),
  admin = require('../controllers/admin.server.controller');


module.exports = function (app) {
  // User route registration first. Ref: #713
  require('./users.server.routes.js')(app);

  // Users collection routes
  app.route('/api/users')
    .get(core.requiresLoginToken, adminPolicy.isAllowed, admin.list);

  // ShopOwner collection routes
  app.route('/api/users/shopowner')
    .get( admin.shopOwner);

  // Single user routes
  app.route('/api/users/:userId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(core.requiresLoginToken, adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Finish by binding the user middleware
  app.param('userId', admin.userByID);
};
