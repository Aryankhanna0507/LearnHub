import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },
    subTitle: String,
    description: String,

    category: {
      type: String,
      required: true,
      trim: true,
    },

    courseLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
      default: "Beginner",
    },

    coursePrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    courseThumbnail: String,

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);