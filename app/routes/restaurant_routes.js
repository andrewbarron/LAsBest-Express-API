const express = require('express')
const passport = require('passport')
const router = express.Router()
const requireToken = passport.authenticate('bearer', { session: false })
const Restaurant = require('../models/restaurant')
// const CustomerReview = require('../models/customerReview')
// const User = require('../models/user')
const customErrors = require('../../lib/custom_errors')
// const requireOwnership = customErrors.requireOwnership
const handle404 = customErrors.handle404

// create a restaurant
router.post('/restaurants', requireToken, (req, res, next) => {
  // get data from request
  const restaurantSuperData = req.body.restaurant
  restaurantSuperData.owner = req.user._id
  // create the restaurant
  Restaurant.create(restaurantSuperData)
    .then(restaurantSuperData => {
      res.status(201).json({ restaurantSuperData })
    })
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
  Restaurant.findOne({
    _id: id,
    owner: req.user._id
  })
    .then(handle404)
    .then(restaurant => res.status(200).json({ restaurant: restaurant.toObject() }))
    .catch(next)
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

// // add customerReview to restaurant
// router.patch('/restaurants/:restaurantId/customerReviews', requireToken, (req, res, next) => {
//   // extract the restaurantId route parameter
//   const restaurantId = req.params.restaurantId
//   const customerId = req.user._id
//   Restaurant.findById(restaurantId)
//     .then(restaurant => {
//       restaurant.customerReview.push(customerId)
//       return restaurant.save()
//     })
//     .then(() => User.findById(customerId))
//     .then(customer => {
//       customer.restaurants.push(restaurantId)
//       return customer.save()
//     })
//     .then(() => res.sendStatus(200))
//     .catch(next)
// })

module.exports = router
