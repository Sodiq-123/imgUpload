var Stats = require('./stats'),
    Images = require('./images'),
    Comments = require('./comments'),
    async = require('async');

module.exports = function(viewModel, callback){
    async.parallel([
        (next) => {
            next(null, Stats());
        },
        (next) => {
            next(null, Images.popular());
        },
        (next) => {
            Comments.newest(next);
        }
    ], (err, results) => {
        viewModel.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };

        callback(viewModel);
    });
};