import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Course = () => {
  return (
    <Card className={"overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadwo-lg hover:shadow-2xl transform: hover:scale-105 transition-all duration-300"}>
      <div className='relative'>
        <img
          src="https://img-c.udemycdn.com/course/480x270/3873464_403c_3.jpg?w=3840&q=75"
          alt="course"
          className="w-full aspect-video object-cover"
        />
        <CardContent className={"px-5 py-4 space-y-3"}>
          <h1 className='hover:underline font-bold text-lg truncate'>Nextjs Complete course in Hindi 2026 </h1>
          <div className='flex items-center justify-between'>
             <div className='flex items-center gap-3'>
            <Avatar className={"h-5 w-5"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className='font-medium text-sm'>Patel Mern Stack</h1>
          </div>
          <Badge className={"bg-blue-600 text-white px-2 py-1 text-xs rounded-full"}>
            Advanced
          </Badge>
          </div>
          <div className='tex-lg font-bold'>
            <span >₹499</span>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default Course
