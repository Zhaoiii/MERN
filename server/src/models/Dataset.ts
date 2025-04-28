import mongoose, { Schema, Document } from "mongoose";

export interface IDataset extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const datasetSchema = new Schema<IDataset>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

export const Dataset = mongoose.model<IDataset>("Dataset", datasetSchema);
