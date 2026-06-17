import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {    Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,} from './ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/feature/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user }=useSelector(store=>store.auth);
 const [logoutUser,{data,isSuccess}]=useLogoutUserMutation();
 const logoutHandler=async ()=>{
  await logoutUser();
 }
//  console.log(user)
 const navigate=useNavigate();

 useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success(data?.message || "User log out.");
    }
  }, [isSuccess]);
  return (
    <div className='h-12 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
      {/* Desktop */}

      <div className='max-w-7xl mx-auto px-10 hidden md:flex justify-between items-center gap-8 h-full'>
        <div className='flex items-center gap-3'>
          <School size={"30"} />
          <Link to={"/"}>
          <h1 className="hidden md:block font-extrabold text-2xl">E-learning</h1>
          </Link>
        </div>
        {/* user icon and dark mode */}
        <div className='flex items-center gap-5'>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-4!" align='right!'>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="my-learning">My Learning</Link></DropdownMenuItem>
                    <DropdownMenuItem > <Link to="profile">Edit profile</Link></DropdownMenuItem>{" "}
                    <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                    {
                      user?.role==="instructor" && (
                        <>
                          <DropdownMenuSeparator />
                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
                        </>
                      )
                    }
                  
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (<div className='flex items-center gap-2'>
              <Button variant='outline'onClick={()=>navigate("/login")} >Login</Button>
              <Button onClick={()=>navigate("/login")}>Signup</Button>
            </div>
            )}
          <DarkMode />
        </div>
      </div>
      {/* mobile device */}
      <div className='flex md:hidden items-center justify-between px-4 pt-2 f-full'>
        <h1 className='font-extrabold text-2xl'>E_learning</h1>
      <MobileNavbar/>
      </div>
    </div>
  )
}

export default Navbar;
const MobileNavbar=()=>{
   const role="instructor";
  return (

  <Sheet>
  <SheetTrigger asChild>
    <Button size='icon' className={"rounded-full bg-gray-200 hover:bg-gray-200"} variant="outline"><Menu/></Button>
  </SheetTrigger>
  <SheetContent className="flex flex-col"> 
    <SheetHeader className='flex flex-row items-center justify-between mt-5 '>
      <SheetTitle>E_learning</SheetTitle>
      <DarkMode/>
    </SheetHeader>
    <div className="border-b my-2" />    
        <nav className='flex flex-col space-y-4 px-4 '>
          <span className="cursor-pointer font-medium">My learning</span>
          <span className="cursor-pointer font-medium">Edit Profile</span>
          <span className="cursor-pointer font-medium">Log out</span>
        </nav>
        {
          role=="instructor" && (
              <SheetFooter className="pt-4 border-t">
      <SheetClose asChild>
      <Button type="submit" className="w-full sm:w-auto">DashBoard</Button>
      </SheetClose>
    </SheetFooter>
          )
        }
  
  </SheetContent>
</Sheet>
  
  )
}
