import mongoose from "mongoose";
import { IDonar } from "../types/commonType";

export const donarSchemas = new mongoose.Schema<IDonar>({
  name: {
    type: String,
    required: true
  },
  blood: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  lastDonation: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  aboutMe: {
    type: String,
    required: true
  },
  disease: [String],
  medicines: [String],
  location: {
    lon: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  }
});