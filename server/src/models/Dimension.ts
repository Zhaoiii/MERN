import mongoose, { Schema, Document } from "mongoose";
import { IDataset } from "./Dataset";

export interface IDimension extends Document {
  name: string;
  dataset: IDataset["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const dimensionSchema = new Schema<IDimension>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    dataset: {
      type: Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Dimension = mongoose.model<IDimension>(
  "Dimension",
  dimensionSchema
);
