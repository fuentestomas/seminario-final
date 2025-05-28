const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        description: { type: String },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "categories"
        },
        startTime: { type: Number },
        photos: {
          type: [
            {
              type: String,
            }
          ]
        }
    },
    { timestamps: true }
);

const Model = mongoose.model('offers', ModelSchema);

module.exports = Model;