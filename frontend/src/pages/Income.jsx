import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import Transaction from '../components/Transaction'
import useGlobalContext from '../context/GlobalContext'
import { FaMoneyBill } from "react-icons/fa";
import { FaBitcoin } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { MdSavings } from "react-icons/md";
import { FaYoutube } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { BiWorld } from "react-icons/bi";
import { PiDotsThreeCircleFill } from "react-icons/pi";

const options = ['Salary','Freelancing','Investment','Stocks','Bitcoin','Bank Transfer','Youtube']

function selectIcon(method){
  switch(method){
    case 'Salary':
      return <FaMoneyBill/>
    case 'Stocks':
      return <GrMoney/>
    case 'Bitcoin':
      return <FaBitcoin/>
    case 'Bank Transfer':
      return <BsBank2/>
    case 'Youtube':
      return <FaYoutube/>
    case 'Freelancing':
      return <BiWorld/>
    case 'Investment':
      return <MdSavings/>
    default:
      return <PiDotsThreeCircleFill/>

  }
}

const Income = () => {

  const {incomes,active,incomeDate,dispatch,actions} = useGlobalContext()
  const [incomeByMonth,setIncomeByMonth] = useState([])
  const [total,setTotal] = useState(0)

  useEffect(()=>{
    if(incomes){
      const data = incomes.filter(item=>getMonth(item.date)===getMonth(incomeDate))
      const totalByMonth = data.reduce((acc,item)=>item.amount+acc,0)
      setTotal(totalByMonth)
      setIncomeByMonth(data)
    }
  },[incomeDate,incomes])

  function getMonth(date){
    return date.split('-')[1]
  }

  return (
    <div className={`entries-tab ${active==='income'?'active':''}`}>
      <div className="head">
        <div className="title">
          <h1>Incomes</h1>
        </div>
        <div className="filter">
          <input type='month' value={incomeDate} onChange={(e)=>dispatch({type:actions.INCOME_DATE,payload:e.target.value})}/>
          <div className="tab-total"> Total : {total}</div>
        </div>
      </div>
      <div className='transaction-container'>
        <Form options={options} type='incomes' data={incomes}/>
        {
          incomes.length?<Transaction dataByMonth={incomeByMonth} data={incomes} type='incomes' selectIcon={selectIcon}/>:
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

export default Income