const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema(
    {
        id: { type: String },
        fullName: { type: String, required: true },
        emailAddress: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // roles disponibles employer=solicitante, worker=prestador
        role: {
            type: String,
            required: true,
            enum: ['employer', 'worker'],
            default: 'employer'
        },
        work: { type: String },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories'
        }],
        description: { type: String },
        avgScore: { type: Number },
        phoneNumber: { type: String },
        address: { type: String },
        profilePhoto: { type: String },
        businessName: { type: String },
        openingHour: { type: String },
        closingHour: { type: String }
    },
    { timestamps: true }
);

const Model = mongoose.model('users', ModelSchema);

module.exports = Model;