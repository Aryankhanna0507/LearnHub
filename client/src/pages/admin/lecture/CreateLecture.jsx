import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/feature/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const [createLecture, { isLoading, error, data, isSuccess }] = useCreateLectureMutation();
  const { data: lectureData, isLoading: islectureLoading, isError: lectureError , refetch} = useGetCourseLectureQuery({ courseId });
  const CreateLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId })
  }
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error])
  console.log(lectureData);



  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>Lets's add lecture,add some basic course details for your new lecture</h1>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, minima.</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Title</Label>
          <Input type={"text"} value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} placeholder="Your Title Name" />
        </div>

        <div className='flex gap-2'>
          <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to course</Button>
          <Button disabled={isLoading} onClick={CreateLectureHandler}>
            {
              isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait....
                </>
              ) : "create lecture"
            }
          </Button>
        </div>
        <div className='mt-10 '>
          {
            islectureLoading ? (<p>Loading lecture...</p>) : lectureError ? (<p>Failed to load lectures..</p>) : lectureData.lectures.length == 0 ? (<p>No lectures Available</p>) : (lectureData.lectures.map((lecture,index)=> <Lecture key={lectureData._id} lecture={lecture} index={index} courseId={courseId} />))
          }

        </div>
      </div>
    </div>
  )
}

export default CreateLecture
