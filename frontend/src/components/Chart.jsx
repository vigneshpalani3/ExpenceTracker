import {useState,useEffect} from 'react'
import {Area,AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import useGlobalContext from '../context/GlobalContext'
import { format } from 'date-fns'

const Chart = () =>{

  const {incomes,expenses} = useGlobalContext()
  const [data,setData] = useState([])
  
  useEffect(()=>{
    destructureData()
  },[incomes,expenses])

  useEffect(()=>{
    console.log(data)
  },[data])

  function destructureData(){
    const combined = {}
    incomes.forEach(({date,amount})=>{
      const dateFormat = format(date,'dd-MM-yyyy')
      if(!combined[dateFormat]){
        combined[dateFormat]={}
      }
      if(!combined[dateFormat]?.income){
        combined[dateFormat].income=amount
      }else{
        combined[dateFormat].income+=amount
      }
    })

    expenses.forEach(({date,amount})=>{
      const dateFormat = format(date,'dd-MM-yyyy')
      if(!combined[dateFormat]){
        combined[dateFormat]={}
      }
      if(!combined[dateFormat]?.expense){
        combined[dateFormat].expense=amount
      }else{
        combined[format(date,'dd-MM-yyyy')].expense+=amount
      }
    })
    const combinedArr=Object.keys(combined)?.map(key=>{
      const value=combined[key]
      return {
        date:key,
        income:value.income||0,
        expense:value.expense||0
      }
    })
    combinedArr.reverse()
    setData(combinedArr)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={250} height={250} data={data.reverse()}>
        <CartesianGrid strokeDasharray="4 4" stroke='#999'/>
        <YAxis fontSize='12'/>
        <XAxis dataKey={'date'} fontSize='14'/>
        <Area dataKey='income' stroke='blue' strokeWidth='2' fill='blue'/>
        <Area dataKey='expense' stroke='indigo' strokeWidth='2' fill='indigo'/>
        <Legend/>
        <Tooltip/>
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Chart