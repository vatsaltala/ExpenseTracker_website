import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chart1 = () => {
    const [expense, setExpense]= useState({})
    const [income,setIncome]=useState({})
    const {userid} =params()
    const {categoryid} =params()
    const fetchdatabyuseridandcategoryid=async(categoryid)=>{
        const expres= await axios.get(`http://localhost:3000/expense/user/${userid}/category/${categoryid}`)
        const incres = await axios.get(`http:/localhost:3000/income/user/${userid}/category/${categoryid}`)
        console.log(expres)
        setExpense(expres.data.data)
        console.log(incres)
        setIncome(incres.data.data)

    }

    useEffect(()=>{
        var userid=req.params.userid
        var categoryid =req.params.cateoryid
        fetchdatabyuseridandcategoryid() 
    })
  return (
    <div>
      <h1>chart</h1>
      <table>
        <thead>
            <tr>
                <th>Category</th> 
                <th>Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Transaction Date</th>
            </tr>
        </thead>
        <tbody>
            {
                expense.map((exp)=>{
                    return <tr>
                        <td>{exp.category}</td>
                        <td>{exp.title}</td>
                        <td>{exp.description}</td>
                        <td>{exp.amount}</td>
                    </tr>
                })
            }
            {
                income.map((inc)=>{
                    return<tr>
                        <td>{inc.category}</td>
                        <td>{inc.title}</td>
                        <td>{inc.description}</td>
                        <td>{inc.amount}</td>
                    </tr>
                })
            }
        </tbody>
      </table>

    </div>
  )
}

export default Chart1

