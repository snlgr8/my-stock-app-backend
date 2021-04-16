const { model, Schema } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subtype: [
      {
        type: String,
      },
    ],
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Category', CategorySchema);
