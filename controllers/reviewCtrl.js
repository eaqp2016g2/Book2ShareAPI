/**
 * Created by juan on 14/04/17.
 */

var Review = require('../models/reviewModel');

exports.getReviewByBook = function (req, res) {
    // Review.findOne({_id: req.params.book_id}, function (err, book) {
    //     if (err) {
    //         res.send(err)
    //     }
    //     else {
    //         res.json(book);
    //     }
    // })
};

exports.getReviewByID = function (req, res) {
    // Review.findOne({_id: req.params.review_id}, function (err, book) {
    //     if (err) {
    //         res.send(err)
    //     }
    //     else {
    //         res.json(book);
    //     }
    // })
};

exports.setReview = function (req, res) {
    Review.create(
        {
            body: req.body.msg
        },
        function (err) {
            if (err)
                res.send(err);
            Review.find(function (err, review) {
                if (err)
                    res.send(err);
                res.json(review);
            });
        });
};

exports.editReview = function (req, res) {
    
}

exports.deleteReview = function (req, res) {
    Review.remove({_id: req.params.review_id}, function (err) {
        if (err)
            res.send(err);
        Review.find(function (err, review) {
            if (err)
                res.send(err);
            res.json(review);
        });
    });
};
