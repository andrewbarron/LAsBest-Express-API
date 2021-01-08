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
  Restaurant.find()
    .then(restaurant => {
      return restaurant.map(restaurant => restaurant.toObject())
    })
    .then(restaurant => res.status(200).json({ restaurant: restaurant }))
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

module.exports = router
