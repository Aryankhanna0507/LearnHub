import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { CarTaxiFront } from 'lucide-react';
import React, { useState } from 'react'
const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];
const Filter = ({handlFilterChange}) => {
  const [selectedCategories,setSelectedCategories]=useState([]);
   const [sortByPrice,setSortByPrice]=useState("");
  const handleCategoryChange=(categoryId)=>{
    setSelectedCategories((prevCategories)=>{
      const newCategories=prevCategories.includes(categoryId)?prevCategories.filter((id)=>id!==categoryId):[...prevCategories,categoryId];
      handlFilterChange(newCategories,sortByPrice);
      return newCategories;
    })
  }
  const selectByPriceHandler=(SelectedValue)=>{
    setSortByPrice(SelectedValue);
    handlFilterChange(selectedCategories,SelectedValue)
  }
  return (
    <div className='w-full md:w-[20%]'>
      <div className='flex flex-col gap-3'>
      <h1 className='font-semibold text-lg md:text-xl'>Filter options</h1>
      <Select onValueChange={selectByPriceHandler}>
        <SelectTrigger>
          <SelectValue placeholder="sort by"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
          <SelectLabel>Sort By Price</SelectLabel>
          <SelectItem value="low">Low to high</SelectItem>
          <SelectItem value="high">High to Low</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
      <Separator className="my-4"/>
      <div>
        <h1 className='font-semibold'>CATAEGORY</h1>
        {
          categories.map((category)=>(
            <div 
              key={category.id}
              className='flex items-center space-x-2 my-2'
            >
              <Checkbox 
                id={category.id}
                onCheckedChange={()=>handleCategoryChange(category.id)}
              />

              <Label 
                htmlFor={category.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </Label>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Filter
