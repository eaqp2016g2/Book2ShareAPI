/**
 * Created by juan on 17/03/17.
 */

var express = require('express');
var userController = require('../controllers/userCtrl');
var bookController = require('../controllers/bookCtrl');
var messagingController = require('../controllers/messagingCtrl');
var locationController = require('../controllers/interchangeCtrl');
var adminController = require('../controllers/adminCtrl');
var notificationController = require('../controllers/notificationCtrl');

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
    router.route('/users/reqbooks')
        .get(bookController.getOurRequestedBooks);
    router.route('/users/upload')
        .post(userController.avatarUpload);
    router.route('/notifications/:value')
        .put(notificationController.allowNotifications);
    router.route('/notifications')
        .post(notificationController.colour);
    router.route('/notifications/read/:id')
        .put(notificationController.markRead);


    /* ADMINISTRACIÓ */

    router.route('/admin/:user_id')
        .delete(adminController.deleteUserById);

    /* BOOKS */

    router.route('/book')
        .get(bookController.getBooks)
        .post(bookController.addBook);
    router.route('/book/:book_id')
        .get(bookController.getBookByID)
        .put(bookController.updateBook)
        .delete(bookController.deleteBook);
    router.route('/book/:book_id/favorite')
        .get(bookController.checkRequest)
        .put(bookController.markAsRequested)
        .delete(bookController.unMarkAsRequested);
    router.route('/book/:book_id/lean/:user_id')
        .put(bookController.approveLend)
        .delete(bookController.denyLend);
    router.route('/books/user/:propietary')
        .get(bookController.getBooksByPropietary);
    router.route('/book/search/title/:title')
        .get(bookController.getBookByTitle);
    router.route('/book/search/author/:author')
        .get(bookController.getBookByAuthor);
    router.route('/book/search/genre/:genre')
        .get(bookController.getBookByGenre);
    router.route('/book/search/language/:language')
        .get(bookController.getBookByLanguage);
    router.route('/book/search/intPoint/:point')
        .get(bookController.getBookByPoint);

    /* MESSAGING */

    router.route('/msg')
        .post(messagingController.sendMessage);
    router.route('/msg/:user_id')
        .get(messagingController.getMessagesByUser)
        .put(messagingController.markRead);
    router.route('/conversations/:user_id')
        .get(messagingController.refreshConversations);

    /* LOCATIONS */

    router.route('/intPoints')
        .post(locationController.setPoint)
        .get(locationController.getPoints);
    router.route('/loc/:loc_id')
    //        .put(locationController.editPoint)
    //      .delete(locationController.deletePoint)
        .get(locationController.getPointByID);


    /* SERGI */

    router.route('/private')
        .get(auth.isAuth, function (req, res) {
            res.status(200).send({message: 'Tienes acceso'})
        });

    app.use('/api', router);
};
