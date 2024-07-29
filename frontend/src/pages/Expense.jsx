import React,{useState,useEffect} from 'react'
import useGlobalContext from '../context/GlobalContext'
import Form from '../components/Form';
import Transaction from '../components/Transaction'
import { FaBook } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { RiTakeawayFill } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { PiDotsThreeCircleFill } from "react-icons/pi";

const options = ['Education','Shopping','Health','Subscriptions','Takeaway','Clothes','Travel','Food']

function selectIcon(method){
  switch(method){
    case 'Education':
      return <FaBook/>
    case 'Shopping':
      return <FaShoppingBag/>
    case 'Health':
      return <MdHealthAndSafety/>
    case 'Subscriptions':
      return <MdSubscriptions/>
    case 'Takeaway':
      return <RiTakeawayFill/>
    case 'Clothes':
      return <GiClothes/>
    case 'Travel':
      return <MdOutlineModeOfTravel/>
    case 'Food':
      return <IoFastFood/>
    default:
      return <PiDotsThreeCircleFill/>
  }
}

const Expense = () => {
  
  const { expenses,active,expenseDate,dispatch,actions} = useGlobalContext()
  const [expenseByMonth,setExpenseByMonth] = useState([])
  const [total,setTotal] = useState(0)

  useEffect(()=>{
    if(expenses){
      const data = expenses.filter(item=>getMonth(item.date)===getMonth(expenseDate))
      const totalByMonth = data.reduce((acc,item)=>item.amount+acc,0)
      setTotal(totalByMonth)
      setExpenseByMonth(data)
    }
  },[expenseDate,expenses])

  function getMonth(date){
    return date.split('-')[1]
  }
  
  return (
    <div className={`entries-tab ${active==='expense'?'active':''}`}>
      <div className="head">
        <div className="title">
          <h1>expenses</h1>
        </div>
        <div className="filter">
          <input  type='month' value={expenseDate} onChange={(e)=>dispatch({type:actions.EXPENSE_DATE,payload:e.target.value})}/>
          <div className="tab-total">Total : {total}</div>
        </div>
      </div>
      <div className='transaction-container'>
        <Form type='expenses' data={expenses} options={options}/>
        {
          expenseByMonth.length?<Transaction dataByMonth={expenseByMonth} data={expenses} type='expenses' selectIcon={selectIcon}/>:
          (
            <div className="no-data">
              No Valid Data Available Add A Entry
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Expense