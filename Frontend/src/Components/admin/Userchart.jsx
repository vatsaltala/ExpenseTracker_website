import axios from 'axios'
import { ArcElement, BarElement, CategoryScale, Chart, LinearScale } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'


Chart.register(CategoryScale,LinearScale,BarElement,ArcElement)
export const Userchart = () => {

    const [subcategories, setSubcategories] = useState([])
    const [sub, setSub] = useState({})
    const [chartData, setchartData] = useState({
        labels:[],
        datasets:[
            {
                label:"Loading..",
                data:[],
                backgroundColors:[]
            }
        ]
    })
    const {userId} = useParams()
    const {categoryId} =useParams()

    const subcategoryexpense=async()=>{
        
        const subexp= await axios.get(`http://localhost:3000/user/${userId}/category/${categoryId}`)
        setSub(subexp.data.data)
        
    }

    const getAllProducts = async()=>{
        const res = await axios.get("http://localhost:3000/subcategory/getsubcategories")
        console.log(res.data) //[8]
        setSubcategories(res.data.data)
        setchartData({
            labels:subcategories?.map((subcategory)=>{
                return<div>
                {subcategory.subcategory || "N/A"}</div>
            }),
            datasets:[
                {
                label:"prodcut data",
                data:subcategories?.map((subcategory)=>subcategory.price || 0),
                backgroundColor:["red","green","yellow"],
                borderWidth:15

                }

            ]
        })
    }

    useEffect(()=>{
        getAllProducts()
    })
  return (
    <div>
            <h1>CHART DEMO</h1>
            {/* <Bar data={chartData}></Bar> */}
            <Pie data={chartData}></Pie>
    </div>
  )
}
