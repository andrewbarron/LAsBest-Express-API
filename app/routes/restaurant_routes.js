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
  restaurantData.owner = req.params.id
  // create the restaurant
  Restaurant.create(restaurantData)
    .then(restaurantData => res.status(201).json({ restaurantData: restaurantData }))
    .catch(next)
})

// find /restaurants
router.get('/restaurants', requireToken, (req, res, next) => {
  Restaurant.find({ owner: req.user._id })
    .then(restaurant => res.status(201).json({ restaurant: restaurant }))
    .catch(next)
})

// show one /restaurant
router.get('/restaurant/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then(restaurant => res.status(201).json({ restaurant: restaurant }))
    .catch(next)
})

module.exports = router
