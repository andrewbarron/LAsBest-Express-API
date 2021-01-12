const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  favoriteDish: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = reviewSchema
