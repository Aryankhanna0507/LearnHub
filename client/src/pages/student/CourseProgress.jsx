import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/feature/api/courseProgressApi';
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] = useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] = useInCompleteCourseMutation();

  const handleCompleteCourse = async () => {
    try {
      const res = await completeCourse(courseId).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error("Failed to complete course");
    }
  }
  const handleInCompleteCourse = async () => {
    try {
      const res = await inCompleteCourse(courseId).unwrap();
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error("Failed to incomplete course");
    }
  }
  if (isLoading) return <p>Loading.....</p>
  if (isError) return <p>Failed to load course detail</p>

  console.log(data)
  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  // initialize the first lecture is not exist
  const initialLecture = currentLecture || courseDetails.lectures && courseDetails.lectures[0];
  const isLectureCompleted = (lectureId) => {
    return progress?.some(
      (prog) => prog.lectureId.toString() === lectureId.toString()
        && prog.viewed
    )
  }
  const handleLectureProgress = async (lectureId) => {
    // console.log("lecture id",lectureId);

    const res = await updateLectureProgress({
      courseId,
      lectureId
    });

    // console.log("update response",res);

    await refetch();
  }
  // handle select a specefic lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id)
  }

  // const isCompleted=true;
  return (
    <div className='max-w-7xl mx-auto p-4 mt-15 px-10'>
      {/* {display course name} */}
      <div className='flex justify-between mb-4'>
        <h1 className='tex-2xl font-bold'>{courseTitle}</h1>
        <Button onClick={completed ? handleInCompleteCourse : handleCompleteCourse} variant={completed ? 'outline' : 'default'}>{completed ? <div className='flex items-center gap-1'><CheckCircle className='h-4 w-4 mr-1' /> <span>Completed</span></div> : "Mark as completed"} </Button>
      </div>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* {video section} */}
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>

            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-100 rounded-lg object-cover"
              onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
            />
          </div>
          {/* Display current watching lecture title */}
          <div className='mt-2 '>
            <h3 className='font-medium text-lg'>{`Lecture${courseDetails.lectures.findIndex((lec) => lec._id === (currentLecture?._id || initialLecture._id)) + 1}:${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}</h3>
          </div>
        </div>
        {/* leccture side bar */}
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl:-4 pt-4 md:pt-0'>
          <h2 className='font-semibold tex-xl mb-4 px-4'>    Course Lecture</h2>
          <div className='flex-1 overflow-y-auto px-4'>
            {
              courseDetails?.lectures?.map((lecture) => (
                <Card key={lecture._id} className={`mb-3 hover:cursor-pointer transition transfrom ${lecture._id === currentLecture?._id ? 'bg-gray-200' : 'dark:bg-gray-800'}`} onClick={() => handleSelectLecture(lecture)}>
                  <CardContent className={"flex items-center justify-between px-5"}>
                    <div className='flex items-center'>
                      {
                        isLectureCompleted(lecture._id) ? (<CheckCircle2 size={24} className='text-green-500 mr-2' />) : (<CirclePlay size={24} className='text-gray-500 mr-2' />)
                      }
                      <div>
                        <CardTitle className={"text-lg font-medium"}>{lecture.lectureTitle}</CardTitle>
                      </div>
                    </div>
                    {
                      isLectureCompleted(lecture._id) && (
                        <Badge className={"bg-green-200 text-green-600"} variant='outline'>Completed</Badge>
                      )
                    }

                  </CardContent>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress
