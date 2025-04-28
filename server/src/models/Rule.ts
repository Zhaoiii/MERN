import mongoose, { Schema, Document } from "mongoose";
import { IDataset } from "./Dataset";
import { IDimension } from "./Dimension";

export interface IRule extends Document {
  content: string;
  dataset: IDataset["_id"];
  dimension: IDimension["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const ruleSchema = new Schema<IRule>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    dataset: {
      type: Schema.Types.ObjectId,
      ref: "Dataset",
      required: true,
    },
    dimension: {
      type: Schema.Types.ObjectId,
      ref: "Dimension",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Rule = mongoose.model<IRule>("Rule", ruleSchema);
