import mongoose from 'mongoose';
import { IDonar } from '../types/commonType';

export const donarSchemas = new mongoose.Schema<IDonar>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      'https://www.pngitem.com/pimgs/m/80-800194_transparent-users-icon-png-flat-user-icon-png.png',
  },
  blood: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastDonation: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  aboutMe: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  disease: [String],
  medicines: [String],
  location: {
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
});
