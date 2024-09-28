import { Schema } from 'mongoose';
import { IUSER } from '../../../interfaces';

export const userSchema = new Schema<IUSER>(
    {
        firstName: { type: String, trim: true },
        lastName: { type: String, trim: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
