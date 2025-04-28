import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  name: string;
  age: number;
  grade: string;
  major: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>(
  {
    studentId: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
    grade: {
      type: String,
      required: true,
      trim: true,
    },
    major: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "请输入有效的邮箱地址",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{11}$/, "请输入有效的手机号码"],
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);
