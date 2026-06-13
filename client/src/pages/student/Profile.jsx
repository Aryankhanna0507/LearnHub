import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React from 'react'
import Course from './Course'
import { useLoadUserQuery } from '@/feature/api/authApi'

const Profile = () => {
  const {data,isLoading}=useLoadUserQuery();
  console.log(data);
  const enrolledCourses = [1, 2];
  return (
    <div className='max-w-4xl mx-auto my-18 px-8'>
      <h1 className='font-bold text-3xl text-center md:text-left'> PROFILE</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-3'>
        <div className='flex flex-col items-center'>
          <Avatar className={"h-24 w-24 md:h-32 md:w-32 mb--4"}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Name:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>Patel Mern stack</span>
            </h2>
          </div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Email:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>patel@gmail.com</span>
            </h2>
          </div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Role:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>Instructor</span>
            </h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className={"mt-2"}>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Name</Label>
                  <Input type="text" placeholder="Name" className={"col-span-3"}></Input>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Porfile Photo</Label>
                  <Input type="file" accept="image/*" className={"col-span-3"}></Input>
                </div>
              </div>
              <DialogFooter>
                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Please wait</span>
                    </>
                  ) : (
                    <span>Save changes</span>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className='font-medium text-lg'>courses you are enrolled in</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
          {
            enrolledCourses.length == 0 ? <h1>You haven't enrolled yet</h1> : (
              enrolledCourses.map((course, index) => <Course key={index} />)
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
