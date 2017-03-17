/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var userController = require('../controllers/userCtrl');

module.exports = function(app) {
    var apiRoutes = express.Router();

    /**Users**/
    apiRoutes.route('/users/register')
        .post(userController.register);
    apiRoutes.route('/users/login')
        .post(userController.login);
    //apiRoutes.route('/logout')
    //    .post(userController.logout);

    //apiRoutes.route('/users')
    //    .get(userController.getUsers);
    //apiRoutes.route('/users/:userid')
    //    .get(userController.getUserById)
    //    .put(userController.updateUser)
    //    .delete(userController.deleteUserById);
    //apiRoutes.route('/users/upload')
    //    .post(userController.avatarUpload);

    app.use('/api', apiRoutes);
};