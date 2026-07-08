import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPurchasedCoursesQuery } from '@/feature/api/purchaseApi';
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Dashboard = () => {
  const {data,isSuccess,isError,isLoading}=useGetPurchasedCoursesQuery();
  if(isLoading) return <h1>Loading..</h1>
  if(isError) return <h1 className='text-rose-500'>failed to get purchased courses</h1>
  const purchasedCourse=data||[];
  const courseData=purchasedCourse?.purchasedCourse?.map((course)=>({
    name:course.courseId.courseTitle,
    price:course.courseId.coursePrice
  }))
  const totalRvenue=purchasedCourse?.purchasedCourse?.reduce((acc,element)=>acc+(element.amount || 0), 0)
  const totalSales=purchasedCourse?.purchasedCourse?.length
   return (
    <div  className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-center lg:grid-cols-4'>
      
      <Card className={"shadow-lg hover:shadow-xl transition-shadow duration-300"}>
      <CardHeader>
      <CardTitle> Total Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold text-blue-600'>{totalSales}</p>
      </CardContent>
      </Card>

      <Card className={"shadow-lg hover:shadow-xl transition-shadow duration-300"}>
      <CardHeader>
      <CardTitle> Total revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold text-blue-600'>{totalRvenue}</p>
      </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-2 md:col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Course Prices
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={courseData}>

            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>

            <XAxis
              dataKey="name"
              stroke="#6b7280"
              angle={-30}
              textAnchor="end"
              interval={0}
            />

            <YAxis stroke="#6b7280"/>

            <Tooltip formatter={(value,name)=>[`₹${value}`,name]}/>

            <Line
              type="monotone"
              dataKey="price"
              stroke="#4a90e2"
              strokeWidth={3}
              dot={{
                stroke:"#4a90e2",
                strokeWidth:2
              }}
            />

          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      </Card>

    </div>
  )
}

export default Dashboard;
