import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, LockIcon, PlayCircle } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
  const params=useParams();
  const courseId=params.courseId;
  const purchasedCourse=false;
  return (
     <div className='mt-12 space-y-5'>
      <div className='bg-[#2d2f31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-6 md:px-10 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
          <p className='text-base md:text-lg'>Course subtitle</p>
          <p>Created By{""} <span className='tex-[#c0c4fc] underline italic'>Patel mern stack</span></p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16}/>
            <p>Last updated:20-20-26</p>
          </div>
            <p>Student enrolled: 10</p>
        </div>
      </div>
      <div className='mx-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-1/2 space-y-5 '>
        <h1 className='font-bold tex-xl md:text-2xl'> Description</h1>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, unde voluptates! Laudantium doloribus vitae reiciendis dignissimos aperiam! Iusto, aperiam minima esse ratione ullam possimus non rerum. Ut blanditiis sit nobis.Quia consequatur exercitationem rerum neque, pariatur et suscipit impedit illum nisi, amet dicta unde aspernatur adipisci ad! Recusandae placeat harum praesentium nesciunt aliquam vitae maxime eaque 
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              4 lectures
            </CardDescription>
          </CardHeader>
          <CardContent className={"space-y-3"}>
            {
              [1,2,3].map((_,idx)=>(
                <dev key={idx} className='flex items-center gap-3 text-sm'>
                  <span>
                    {
                      true?(<PlayCircle size={14}/>):<LockIcon size={14}/>
                    }
                  </span>
                  <p>lecture title</p>
                </dev>
              ))
            }
          </CardContent>
        </Card>
        </div>
        <div className='w-full lg:w-1/3'>
        <Card>
          <CardContent className={"p-4 flex flex-col"}>
            <div className='w-full aspect-video mb-4'>
              React player Video aayga
            </div>
            <h1>Lecture Title</h1>
            <Separator className='my-2'/>
            <h1 className='text-lg md:text-xl font-semibold'>Course pirce</h1>
          </CardContent>
          <CardFooter className={"flex justify-center"}>
            {
              purchasedCourse?(
                <Button className='w-full'>Continue Course</Button>
              ):<BuyCourseButton courseId={courseId}/>
            }
            
          </CardFooter>
        </Card>
          
        </div>
      </div>
     </div>
  )
}

export default CourseDetail
