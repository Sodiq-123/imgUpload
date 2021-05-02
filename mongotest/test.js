var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/mongotest', {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
    console.log('Connected to MongoDB!');

    var collection = db.db("testing", function(err, res) {
        if (err) throw err;  
        console.log("Collection is created!"); 
    });
    
    collection.insertOne({'title': 'Snowcrash'}, function(err, docs) {
        if (err) throw err;
        console.log(docs.length + 'record inserted');
        console.log(docs[0].title + ' - ' + docs[0]._id);

        collection.findOne({title: 'Snowcrash'}, function(err, doc) {
            console.log(doc._id + ' - ' + doc.title);
        });
        db.close();
    });
});

