const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        description: { type: String },
        offerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "offers"
        },
        status: {
          type: String,
          enum: [''],
        }
    },
    { timestamps: true }
);

const Model = mongoose.model('appliers', ModelSchema);

module.exports = Model;