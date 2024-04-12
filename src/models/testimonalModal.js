import mongoose from "mongoose";

const testimonalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }
}, { timestamps: true })

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonalSchema)