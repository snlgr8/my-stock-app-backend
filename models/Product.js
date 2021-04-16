const { model, Schema } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    boughtPrice: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    subtype: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Product', ProductSchema);
