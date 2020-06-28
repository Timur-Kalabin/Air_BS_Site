
const express = require("express"); 
const app = new express();
var exphbs = require('express-handlebars');
var hbs = exphbs.create({ /* config */ });

app.set("view engine", "hbs");
const MongoClient = require("mongodb").MongoClient;

app.use(express.static('public'));

app.use("/search", function(request, response) {
    MongoClient.connect("mongodb://<dbuser>:<dbpassword>@ds127968.mlab.com:27968/<Database>?authSource=<Database>&retryWrites=false", { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) throw err;
        var db = client.db("<Database>");
        var req = (request.query.query).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        if (req) {
            db.collection("<collection_name>").find({ $or: [
                { Name: { '$regex' : req, '$options' : 'i' } },
                { Author: { '$regex' : req, '$options' : 'i' } } ] } ).limit(50).toArray(function(err, result) { //первые 50 результатов
                if (err) throw err;
                response.send(result);
            });
        }
        else {
            response.send('empty');
        }
    });
});

app.use("/getRandom", function(request, response) {
    MongoClient.connect("mongodb://<dbuser>:<dbpassword>@ds127968.mlab.com:27968/<Database>?authSource=<Database>&retryWrites=false", { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) throw err;
        var db = client.db("<Database>");
        db.collection("<collection_name>").aggregate([{$sample: {size: 4}}]).toArray (function(err, result) {
            if (err) throw err;
            response.send(result);
        });
    });
});

app.use("/books", function(request, response){
    response.render("books.hbs", {
    });
});

app.use("/", function(request, response) {
    response.render("index.hbs", {
    });
});

app.listen(process.env.PORT || 3000);
