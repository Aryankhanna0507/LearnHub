import mongoose from "mongoose";
const lecutureProgressSchema=new mongoose.Schema({
  lectureId:{type:String},
  viewed:{type:Boolean,default:false}
});
const courseProgressSchema=new mongoose.Schema({
  userId:{type:String},
  courseId:{type:String},
  completed:{type:Boolean,default:false},
  lectureProgress:[lecutureProgressSchema]
})
export const CourseProgress=new mongoose.model("CourseProgress",courseProgressSchema);