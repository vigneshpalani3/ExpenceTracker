import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import useGlobalContext from '../context/GlobalContext';
import { format } from 'date-fns';

// title,amount,date,category,description

const Form = ({options,type,data}) => {

  const {addEntry} = useGlobalContext()
  const [title,setTitle] = useState('')
  const [amount,setAmount] = useState('')
  const [date,setDate] = useState(format(new Date,'yyyy-MM-dd'))
  const [category,setCategory] = useState(options[0])
  const [description,setDescription] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    const newItem = {
      title,
      amount,
      date:format(date,'yyyy-MM-dd'),
      category,
      description
    }
    addEntry(type,newItem)
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type="text" className='input' placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} required/>
        <input type="number" className='input' placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} required/>
        <input type="date" className='input' value={date} onChange={(e)=>setDate(e.target.value)} required/>
        <select className='input' placeholder='Select Option' value={category} onChange={(e)=>setCategory(e.target.value)} required>
          {
            options.map((option,index)=>(
             <option value={option} key={index}>{option}</option>
            ))
          }
          <option value="Other">Other</option>
        </select>
        <textarea className='input' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
        <button><FaPlus/>{` Add ${type}`}</button>
      </form>
    </div>
  )
}

export default Form