import mongoose from 'mongoose';
import crypto from 'crypto';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    address: { type: String, trim: true },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: { type: String, required: true },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//virtual password
userSchema
  .virtual('password')
  .set(function (password) {
    //set password
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  //generate salt
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  encryptPassword: function (password) {
    if (!password) return false;
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
};

export default mongoose.model('User', userSchema);
