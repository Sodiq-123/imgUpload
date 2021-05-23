var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    md5 = require('md5');

module.exports = {
    index: function(req, res) {
        var viewModel = {
            image: {},
            comments: [],
        };

        Models.Image.findOne({filename: {$regex: req.params.image_id} }, function(err, image) {
                if (err) throw err;
                if (image) {
                    image.views = image.views + 1;
                    viewModel.image = image.toObject();
                    image.save();

                    Models.Comment.find({image_id: image._id}, {}, {sort: {'timestamp': 1} })
                        .lean()
                        .exec(function(error, comments) {
                            if (error) {
                                res.redirect('/');
                            }
                            viewModel.comments = comments;
                        })
                    } 
                    sidebar(viewModel, function(viewModel) {
                    res.render('image', viewModel);
                });
            });
    },
    create: function(req, res) {
        var saveImage = function() {
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
                imgUrl = '';

            for(var i=0; i < 6; i+=1) {
                imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            Models.Image.find({filename: imgUrl}, function(err, images) {
                if (images.length > 0) {
                    saveImage();
                } else {
                    var tempPath = req.file.path,
                        ext = path.extname(req.file.originalname).toLowerCase(),
                        targetPath = path.resolve('./public/upload/' + imgUrl + ext);
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(tempPath, targetPath, function(err) {
                            if (err) throw err;

                            var newImg = new Models.Image({
                                title: req.body.title,
                                filename: imgUrl + ext,
                                description: req.body.description,
                            });
                           
                            newImg.save(function(err, image) {
                                console.log('Successfully inserted image: ' + image.filename);
                                res.redirect('/images/' + image.uniqueId);
                            });
                        });
                    } else {
                        fs.unlink(tempPath, function (err) {
                            if (err) throw err;
                            res.status(500).json({ error: "Only Images are allowed" });
                        });
                    }
                }
            });
        };
        saveImage();
    },
    like: function(req, res) {
        Models.Image.findById(req.params.image_id, function(err, image) {
                if (err) {
                    return res.status(500).send('Something went wrong!');
                } if (image) {
                    image.likes = image.likes + 1;
                    image.save(function(error) {
                        if (error) {
                            return res.status(500).send('Something went wrong!');
                        } else {
                            return res.send({likes: image.likes});
                        }
                    });
                }
            });
    },
    comment: function(req, res) {
        Models.Image.findOne({filename: {$regex: req.params.image_id}}, function(err, image) {
            if (err) {
                res.redirect('/');
            } if (image) {
                var newComment = new Models.Comment(req.body);
                // console.log(req.body);
                newComment.email = req.body.email;
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                newComment.save(function(error) {
                    if (error) {
                        console.log(error.message);
                        return res.status(500).json(error);
                    } else {
                        console.log(image.filename)
                        res.redirect('/images/' + image.filename + '#' + newComment._id);
                    }
                });
            }
        });
    },
    remove: function(req, res) {
        Models.Image.findById(req.params.image_id,
            function(err, image) {
                if (err) { throw err}
                else {
                    fs.unlinkSync(path.resolve('./public/upload/' + image.filename),
                        function(err) {
                            if (err) { throw err };

                            Models.Comment.deleteOne({ image_id: image._id },
                                function(err, image) {
                                    image.remove(function(err) {
                                        if (!err) {
                                            res.json(true);
                                        } else {
                                            res.json({ response: "Bad Request." });
                                        }
                                    });
                            });
                    });
            }
        });
    }
};
