/**
 * Created by juan on 14/04/17.
 */

var express = require('express');
var crypto = require('crypto');
var User = require('../models/userModel');
var Point = require('../models/interchangePointModel');

exports.getPointByID = function (req, res) {
    Point.findOne({_id: req.params.loc_id}, function (err, loc) {
        if (err) {
            res.send(err)
        }
        else {
            res.json(loc);
        }
    })
};

exports.getPoints = function (req, res) {
    Point.find(function (err, loc) {
        if (err)
            res.send(err);
        res.json(loc);
    });
}
exports.setPoint = function (req, res) {
    Point.create(
        {
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng
        },
        function (err) {
            if (err)
                res.send(err);
            else
            res.send(true)
        });
};

exports.deletePoint = function (req, res) {
    Point.remove({_id: req.params.loc_id}, function (err) {
        if (err)
            res.send(err);
        Point.find(function (err, loc) {
            if (err)
                res.send(err)
            res.json(loc);
        });
    });
}

