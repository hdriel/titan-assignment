import { Schema } from 'mongoose';
import { IORDER } from '../../../interfaces';
import { TABLES } from '../consts/tables';

export const orderSchema = new Schema<IORDER>(
    {
        email: { type: String, trim: true, required: true },
        fullAddress: { type: String, trim: true, required: true },
        fullName: { type: String, trim: true },
        images: { type: [String], trim: true },
        frameColor: { type: String, trim: true },
        user: { type: Schema.Types.ObjectId, ref: TABLES.USERS, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

orderSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};
