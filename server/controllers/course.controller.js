
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
  
  try {
    console.log("req.id =>", req.id);
    const { courseTitle, category } = req.body;

    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title and category are required.",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      course,
      message: "Course created.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};
export const getCreatorCourses=async(req,res)=>{
  try {
    const userId=req.id;
    const courses=await Course.find({creator:userId});
    if(!courses){
      return res.status(404).json({
        courses:[],
        message:"Course not found"
      })
    }
    return res.status(200).json({
      courses,
    })
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    })
  }
}
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const {courseTitle,subTitle,description,category,courseLevel,coursePrice,} = req.body;
    const thumbnail = req.file;
    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const uploaded = await uploadMedia(thumbnail.path);
      courseThumbnail = uploaded.secure_url;
    }
    const updateData = { courseTitle,subTitle,description,category,courseLevel,coursePrice,
      ...(courseThumbnail && { courseThumbnail }),
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      course,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};
export const getCourseById=async (req,res)=>{
  try {
    const {courseId}=req.params
    const course=await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        message:"course not found"
      })
    }
    return res.status(200).json({
      success:true,
      course
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get  course by id",
    });
  }
}
// lecture controller
export const createLecture=async (req,res)=>{
  try {
    const {lectureTitle}=req.body;
    const {courseId}=req.params;
    if(!lectureTitle || !courseId){
      return res.status(404).json({
        message:"Lectrue title and course id required"
      })
    }
    //  create lecture
    const lecture=await Lecture.create({lectureTitle})
    const course = await Course.findById(courseId);
    if(course){
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(201).json({
      lecture,
      message:"Lecture created successfully."
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
}
// get lecture 
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get lectures",
    });
  }
};
export const editLecture=async (req,res)=>{
  try {
    const {lectureTitle,isPreviewFree,videoInfo}=req.body;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lectures",
    });
    
  }
}
