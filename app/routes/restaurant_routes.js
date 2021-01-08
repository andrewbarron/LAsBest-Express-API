const express = require('express')
const passport = require('passport')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const requireToken = passport.authenticate('bearer', { session: false })

// create a restaurant
router.post('/restaurants', requireToken, (req, res, next) => {
  // get data from request
  const restaurantData = req.body.restaurant
  // add user as restaurant owner
  restaurantData.owner = req.user._id
  // create the restaurant
  Restaurant.create(restaurantData)
    .then(restaurantData => res.status(201).json({ restaurantData: restaurantData }))
    .catch(next)
})

// index
router.get('/restaurants', requireToken, (req, res, next) => {
  Restaurant.find({ owner: req.user._id })
    .populate('restaurant')
    .then(restaurant => res.status(201).json({ restaurant: restaurant }))
    .catch(next)
})

// show  /restaurant
router.get('/restaurants/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => {
      res.status(201).json({ restaurant: restaurant })
    })
})

// DELETE
// DESTORY /restaurants/
router.delete('/restaurants/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => restaurant.deleteOne())
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /restaurants/:id
router.patch('/restaurants/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.restaurant.owner
  Restaurant.findOne({
    _id: id,
    owner: req.user._id
  })
  // Restaurant.findOneAndUpdate({ _id: id, owner: req.user._id }, req.body.restaurant)
    .then(restaurant => restaurant.updateOne(req.body.restaurant))
    // if that succeeded, return 204 and no JSON
    .then(() => res.status(200).json({ restaurant: req.body.restaurant }))
    // if an error occurs, pass it to the handler
    .catch(next)
})
module.exports = router
