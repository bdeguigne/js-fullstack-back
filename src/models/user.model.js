const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');
// const { toJSON, paginate } = require('./plugins');
// const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      //   validate(value) {
      //     if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      //       throw new Error('Password must contain at least one letter and one number');
      //     }
      //   },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUsernameTaken = async function isUsernameTaken(
  username,
  excludeUserId,
) {
  //                                               ne == not equal
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  // (!!) syntax explain here : https://stackoverflow.com/a/29312197/13251493
  return !!user;
};

userSchema.methods.isPasswordMatch = async function isPasswordMatch(password) {
  const user = this;
  return user.password === password;
  // return bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
