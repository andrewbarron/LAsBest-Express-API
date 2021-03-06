const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  favoriteDish: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = reviewSchema
