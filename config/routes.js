/**
 * Created by juan on 17/03/17.
 */
var express = require('express');
var userController = require('../controllers/userCtrl');
var bookController = require('../controllers/bookCtrl');
const auth = require('../middlewares/middleware.js')

bookController.
module.exports = function (app) {
    var apiRoutes = express.Router();

    /**Users**/
    apiRoutes.route('/users/register')
        .post(userController.register);
    apiRoutes.route('/users/login')
        .post(userController.login);
    //apiRoutes.route('/logout')
    //    .post(userController.logout);
    apiRoutes.route('/users')
        .get(userController.getUsers);
    //apiRoutes.route('/users/:userid')
    //    .get(userController.getUserById)
    //    .put(userController.updateUser)
    //    .delete(userController.deleteUserById);
    //apiRoutes.route('/users/upload')
    //    .post(userController.avatarUpload);
    apiRoutes.route('/books')
        .get(bookController.getBooks)
        .post(bookController.setBooks);
    apiRoutes.route('/books/:book_id')
        .get(bookController.getBookbyID);
    apiRoutes.route('/private')
        .get(auth.isAuth, function (req, res) {
            res.status(200).send({message: 'Tienes acceso'})
        });

    app.use('/api', apiRoutes);
};
