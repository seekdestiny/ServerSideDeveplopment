var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes.js');
var Promotions = require('./models/promotions.js');
var Leaders = require('./models/leadership.js');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description: 'test',
        comments: [
            {
                rating: 5,
                comment: 'Imagine all the eatables, living in conFusion!',
                author: 'John Lemon'
            }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
               Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'A unique . . .'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 4,
                        comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
                        author: 'Paul McVites'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });
});

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    Promotions.create({
         name: 'Weekend Grand Buffet',
         image: 'images/buffet.png',
         label: 'New',
         price: '19.99',
         description: 'Featuring . . .'
    }, function (err, promotion) {
        if (err) throw err;
        console.log("Promotion Created!");
        console.log(promotion);

        promotion.save(function (err, promotion) {
            console.log("Save promotion!");
            db.collection('promotions').drop(function () {
            });
        });
    });
});

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    Leaders.create({
        name: 'Peter Pan',
        image: 'images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        description: 'Our CEO, Peter, . . .'
    }, function (err, leader) {
        if (err) throw err;
        console.log("Leader created!");
        console.log(leader);

        leader.save(function (err, leader) {
            console.log('Save leader!');
            db.collection('leaderships').drop(function () {
            });
        });
    });
});
