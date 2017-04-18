/**
 * Created by juan on 17/03/17.
 */

var express = require('express');
var userController = require('../controllers/userCtrl');
var bookController = require('../controllers/bookCtrl');
var messagingController = require('../controllers/messagingCtrl');
var locationController = require('../controllers/interchangeCtrl');
var reviewController = require('../controllers/reviewCtrl');
var adminController = require('../controllers/adminCtrl');

const auth = require('../middlewares/middleware.js')

module.exports = function (app) {
    var apiRoutes = express.Router();

    /* USERS */

    apiRoutes.route('/users/register')
        .post(userController.register);
    apiRoutes.route('/users/login')
        .post(userController.login);
    apiRoutes.route('/users/logout')
        .post(userController.logout);
    apiRoutes.route('/users')
        .get(userController.getUsers);
    apiRoutes.route('/users/:user_id')
        .get(userController.getUserById)
        .put(userController.updateUser)
        .delete(userController.deleteUser);
    apiRoutes.route('/users/upload')
        .post(userController.avatarUpload);

    /* BOOKS */

    apiRoutes.route('/books')
        .get(bookController.getBooks)
        .post(bookController.setBooks);
    apiRoutes.route('/books/:book_id')
        .get(bookController.getBookByID);

    /* MESSAGING */

    apiRoutes.route('/msg')
        .post(messagingController.sendMessage);
    apiRoutes.route('/msg/:user_id')
        .get(messagingController.getMessagesByUser)
        .put(messagingController.markRead);

    /* LOCATIONS */

    apiRoutes.route('/loc')
    //       .post(locationController.newPoint)
    //       .get(locationController.getPoints);
    apiRoutes.route('/loc/:loc_id')
//        .put(locationController.editPoint)
    //      .delete(locationController.deletePoint)
    //    .get(locationController.getPointByID);

    /* REVIEWS */

    apiRoutes.route('/books/:book_id/')
    //      .post(reviewController.newReview)
    //      .get(reviewController.getReviews);
    apiRoutes.route('/books/:book_id/:review_id')
    //      .get(reviewController.getReviewByID);
    //        .put(reviewController.editPoint)
    //      .delete(reviewController.deletePoint)

    /* SERGI */

    apiRoutes.route('/private')
        .get(auth.isAuth, function (req, res) {
            res.status(200).send({message: 'Tienes acceso'})
        });

    app.use('/api', apiRoutes);
};
