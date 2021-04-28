var express = require('express'),
config = require('./server/configure'),
path = require('path'),
app = express();

app.set('port', process.env.PORT || 3300);
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app = config(app);


var server = app.listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});
