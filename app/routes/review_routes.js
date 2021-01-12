const express = require('express')
// const passport = require('passport')
const router = express.Router()
// const requireToken = passport.authenticate('bearer', { session: false })
const Restaurant = require('../models/restaurant')
// const handle404 = require('../../lib/custom_errors')

router.post('/reviews', (req, res, next) => {
  // get the review data from the body of the request
  const reviewData = req.body.review
  const restaurantId = reviewData.restaurantId
  // find the restaurant by its id
  Restaurant.findById(restaurantId)
    // .then(handle404)
    .then(restaurant => {
      // add review to restaurant
      restaurant.reviews.push(reviewData)
      // save restaurant
      return restaurant.save()
    })
    // send responsne back to client
    .then(restaurant => res.status(201).json({restaurant: restaurant}))
    .catch(next)
})

// DESTROY
// DELETE /reviews/:id
router.delete('/reviews/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId
  const restaurantId = req.body.review.restaurantId
  Restaurant.findById(restaurantId)
    .then(restaurant => {
      restaurant.reviews.id(reviewId).remove()
      // Alternatively
      // restaurants.reviews.pull(id)

      return restaurant.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /reviews/:id
router.patch('/reviews/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId
  const reviewData = req.body.review
  const restaurantId = reviewData.restaurantId

  Restaurant.findById(restaurantId)
    .then(restaurant => {
      const review = restaurant.reviews.id(reviewId)
      review.set(reviewData)
      return restaurant.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
