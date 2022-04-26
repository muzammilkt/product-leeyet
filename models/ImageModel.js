const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  imageUrl: {
    type: String,
    // required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
});

module.exports = mongoose.model("image", imageSchema);
