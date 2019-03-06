var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

router.post('/', (req, res) => {
  Tag.create(req.body, (err, tag) => {
    if(err) return res.status(500).json(err);
    res.status(201).json(tag);
  });
});

router.get('/', (req, res) => {
  Tag.find({})
    .then(tags => res.status(200).json({tags: tags}))
    .catch(err => res.status(502).json(err));
})



module.exports = router;