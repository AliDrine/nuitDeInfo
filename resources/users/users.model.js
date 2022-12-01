import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {roles_enum} from '../../configuration/roles.js';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    //  required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "notification",
      },
    ],
    role: {
      type:[String],
      enum:roles_enum,
    },
    archived : {
      type : Boolean,
    },
    isVerified : {
      type : Boolean
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model("User", userSchema);
