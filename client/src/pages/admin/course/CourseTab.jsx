import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from '@/feature/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  });
  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdisLoading ,refetch} = useGetCourseByIdQuery(courseId,{refetchOnMountOrArgChange:true});
  const course = courseByIdData?.course;
  useEffect(() => {
    console.log("INPUT STATE => ", input);
  }, [input]);
  useEffect(() => {
    if (course) {
      console.log("SETTING INPUT");
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "",
      });
    }
  }, [course])
  const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();
  const [publishCourse,{}]=usePublishCourseMutation()
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }
  const selectCategory = (value) => {
    setInput({ ...input, category: value })
  }
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });

  }
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  }
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle)
    formData.append("subTitle", input.subTitle)
    formData.append("category", input.category);
    formData.append("description", input.description)
    formData.append("courseLevel", input.courseLevel)
    formData.append("coursePrice", input.coursePrice)
    formData.append("courseThumbnail", input.courseThumbnail)
    await editCourse({ courseId, formData });
  }
  const publishStatusHandler=async (action)=>{
    try {
      const response=await publishCourse({courseId,query:action})
      if(response.data){
        refetch();
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course")
    }
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "course update.");
    }
    if (error) {
      toast.error(error?.data?.message || "failed to update course");
    }
  }, [isSuccess, error, data]);
  // if(courseByIdisLoading) return <h1>Loading........</h1>
  return (
    <Card>
      <CardHeader className={"flex flex-row justify-between"}>
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you'r done.
          </CardDescription>
        </div>
        <div className='flex gap-1'>
          <Button disabled={courseByIdData?.course.lectures.length==0} variant='outline' onClick={()=>publishStatusHandler(courseByIdData?.course.isPublished?"false":"true")}>
            {
              courseByIdData?.course.isPublished ? "Unpublish" : "Publish"
            }
          </Button>
          <Button >
            Remove course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3 mt-3'>
          <div>
            <Label>Title</Label>
            <Input type="text" name="courseTitle" value={input.courseTitle} onChange={changeEventHandler} placeholder="Ex. Fullstack developer" />
          </div>
          <div>
            <Label>SubTitle</Label>
            <Input type="text" name="subTitle" value={input.subTitle} onChange={changeEventHandler} placeholder="Ex. Become a fullstack developer from zero to hero in two months" />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className='flex items-center gap-5'>
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                    <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel}>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input type="text" name="coursePrice" value={input.coursePrice} onChange={changeEventHandler} placeholder="199" className={"w-fit"} />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" onChange={selectThumbnail} accept="image/*" className={"w-fit"} />
            {
              previewThumbnail && (
                <img src={previewThumbnail} className='w-64 my-2 ' alt="Course Thumbnail" />
              )
            }
          </div>
          <div className='flex flex-row gap-5'>
            <Button onClick={() => navigate('/admin/course')} variant='outline'>Cancel</Button>
            <Button disabled={isLoading} onClick={updateCourseHandler} >
              {
                isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait....
                  </>
                ) : "Save Changes"
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseTab
