const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
    },
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      validate: [validator.isEmail, 'Incorrect Email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is a required field'],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (value) {
          return this.password === value
        },
        message: 'Passwords do not match',
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.createJWT = function (id) {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
}

userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
