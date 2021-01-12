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
  },
  reviewer: {
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = reviewSchema
