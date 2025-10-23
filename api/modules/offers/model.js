const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        employerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        workerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users"
        },
        title: { type: String, required: true },
        description: { type: String },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "categories"
        },
        date: { type: String },
        startTime: { type: String },
        endTime: { type: String },
        status: { type: String, enum: ['open', 'pending', 'inProgress', 'completed', 'cancelled', 'rejected'], default: 'open' },
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