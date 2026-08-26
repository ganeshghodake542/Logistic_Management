const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // never return password by default on queries
    },

    role: {
      type: String,
      enum: ['admin', 'customer', 'driver'],
      required: true,
      default: 'customer',
    },

    phone: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  }, { timestamps: true })



module.exports = mongoose.model("User", userSchema)