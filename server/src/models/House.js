import { Schema } from "mongoose"


export const HouseSchema = new Schema({
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imgUrl: {
    type: String,
    required: true,
    default: '//placehold.it/300x300'
  },
  description: {
    type: String,
    minLength: 3
  },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})