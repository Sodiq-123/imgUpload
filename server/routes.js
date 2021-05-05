var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),
    image = require('../controllers/image');


    
module.exports = function(app) {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.get('/images/like/:image_id', image.like);
    router.get('/images/comment/:image_id', image.comment);
    app.use(router);
};
