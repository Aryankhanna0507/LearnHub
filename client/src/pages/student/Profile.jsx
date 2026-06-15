import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, {  useState,useEffect } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/feature/api/authApi'
import { toast } from 'sonner'

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading,refetch } = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError,error ,isSuccess}] = useUpdateUserMutation()
  // console.log(data);
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);

  }
  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  }
  useEffect(() => {
    if (isSuccess) {
      refetch();// rtk query
      toast.success(updateUserData?.message || "Profile Updated");
    }
    
    if (isError) {
      toast.error(error?.data?.message || "Failed to Update Profile");
    }
  }, [isSuccess, isError, updateUserData, error]);
  useEffect(() => {
    if (data?.user) {
      setName(data.user.name);
    }
  }, [data]);
  if (isLoading) return <h1>Profile Loading</h1>
  console.log(data)
  const user = data && data.user;
  return (
    <div className='max-w-4xl mx-auto my-18 px-8'>
      <h1 className='font-bold text-3xl text-center md:text-left'> PROFILE</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8 my-3'>
        <div className='flex flex-col items-center'>
          <Avatar className={"h-24 w-24 md:h-32 md:w-32 mb--4"}>
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Name:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.name}</span>
            </h2>
          </div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Email:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.email}</span>
            </h2>
          </div>
          <div className='mb-2'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100 text-2xl'>
              Role:
              <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.role.toUpperCase()}</span>
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
                  <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className={"col-span-3"}></Input>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label>Porfile Photo</Label>
                  <Input type="file" onChange={onChangeHandler} accept="image/*" className={"col-span-3"}></Input>
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler}>
                  {updateUserIsLoading ? (
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
            user?.enrolledCourses.length == 0 ? <h1>You haven't enrolled yet</h1> : (
              user?.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
