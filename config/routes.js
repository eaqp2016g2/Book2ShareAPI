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

const auth = require('../middlewares/middleware.js');

module.exports = function (app) {
    var router = express.Router();

    /* USERS */

    router.route('/users/register')
        .post(userController.register);
    router.route('/users/login')
        .post(userController.login);
    router.route('/users/logout')
        .post(userController.logout);
    router.route('/users')
        .get(userController.getUsers);
    router.route('/users/:user_id')
        .get(userController.getUserById)
        .put(userController.updateUser)
        .delete(userController.deleteUser);
    router.route('/users/upload')
        .post(userController.avatarUpload);

    /* ADMINISTRACIÓ */

    router.route('/admin/:user_id')
        .delete(adminController.deleteUserById);

    /* BOOKS */

    router.route('/book')
        .get(bookController.getBooks)
        .post(bookController.setBooks);
    router.route('/book/search/title/:title')
        .get(bookController.getBookByTitle);
    router.route('/book/search/author/:author')
        .get(bookController.getBookByAuthor);
    router.route('/book/search/genre/:genre')
        .get(bookController.getBookByGenre);
    router.route('/book/search/language/:language')
        .get(bookController.getBookByLanguage);
    router.route('/book/:book_id')
        .get(bookController.getBookByID);

    /* MESSAGING */

    router.route('/msg')
        .post(messagingController.sendMessage);
    router.route('/msg/:user_id')
        .get(messagingController.getMessagesByUser)
        .put(messagingController.markRead);

    /* LOCATIONS */

    router.route('/loc')
        .post(locationController.setPoint)
        .get(locationController.getPoints);
    router.route('/loc/:loc_id')
//        .put(locationController.editPoint)
    //      .delete(locationController.deletePoint)
        .get(locationController.getPointByID);

    /* REVIEWS */

    router.route('/books/:book_id/')
    //      .post(reviewController.newReview)
        .get(reviewController.getReviewByBook);
    router.route('/books/:book_id/:review_id')
        .get(reviewController.getReviewByID);
    //        .put(reviewController.editPoint)
    //      .delete(reviewController.deletePoint)

    /* SERGI */

    router.route('/private')
        .get(auth.isAuth, function (req, res) {
            res.status(200).send({message: 'Tienes acceso'})
        });

    app.use('/api', router);
};
