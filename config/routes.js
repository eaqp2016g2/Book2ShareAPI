/**
 * Created by juan on 17/03/17.
 */

var userCtrl = require('../controllers/userCtrl');

module.exports = function(app) {
    var apiRoutes = app.Router();

    /**Users**/
    apiRoutes.route('/users/register')
        .post(userCtrl.register);
    apiRoutes.route('/users/login')
        .post(userCtrl.login);
    apiRoutes.route('/logout')
        .post(userCtrl.logout);

    apiRoutes.route('/users')
        .get(userCtrl.getUsers);
    apiRoutes.route('/users/:userid')
        .get(userCtrl.getUserById)
        .put(userCtrl.updateUser)
        .delete(userCtrl.deleteUserById);
    apiRoutes.route('/users/upload')
        .post(userCtrl.avatarUpload);

    app.use('/api', apiRoutes);
};