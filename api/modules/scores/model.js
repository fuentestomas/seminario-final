const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        receiverId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        rate: { type: Number },
        comment: { type: String },
    },
    { timestamps: true }
);

const Model = mongoose.model('scores', ModelSchema);

module.exports = Model;