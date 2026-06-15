import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
  return (
    <div  className='grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-center lg:grid-cols-4'>
      <Card>
      <CardHeader>
      <CardTitle> Total Sales</CardTitle>
      </CardHeader>
      </Card>

    </div>
  )
}

export default Dashboard
