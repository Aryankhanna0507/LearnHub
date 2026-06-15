import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom';


const SideBar = () => {
  return (
    <div className='flex'>
      <div className='hidden md:block w-[200px] sm:w-[300px] space-y-8 border-r border-r-gray-300 dark:border-gray-700 bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
        <div className='mt-16 space-y-4'>
          <Link to={"/admin/dashboard"} className='flex items-center gap-2'><ChartNoAxesColumn size={22} />
            <h1>Deashboard</h1>
          </Link>
          <Link to={"/admin/course"} className='flex items-center gap-2'>
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-2 bg-white mt-14">
        <Outlet />
      </div>
    </div>
  )
}

export default SideBar;
