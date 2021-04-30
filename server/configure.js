var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    relativeTime = require('dayjs/plugin/relativeTime'),
    dayjs = require('dayjs'),
    multer = require('multer');
    multer = require('multer');

module.exports = function(app) {    
    dayjs.extend(relativeTime);

    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        partialsDir: [path.join(__dirname, '../views/partials')],
        helpers: {
            timeago: function(timestamp) {
                path.join(__dirname, '../views/layouts');
                console.log(new Date(timestamp).toString());
                return dayjs(new Date(timestamp).toString()).fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    app.use(morgan('dev'));
    var storage = multer.diskStorage({ destination: path.join(__dirname, '../public/upload/temp')});
    app.use(multer({storage: storage}).single('file'));

    app.use(methodOverride());
    app.use(cookieParser('2729298RE(#(###(3jdkjhwjh%$(3#80jnf2i4Vrg%ty984'));
    routes(app);

    app.use('/public/', express.static(path.join(__dirname, '../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    return app;
};