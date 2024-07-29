import React, { useEffect, useState } from 'react'
import useGlobalContext from '../context/GlobalContext'
import { FaRupeeSign } from 'react-icons/fa'
import Chart from '../components/Chart'
import {BsCircleFill} from 'react-icons/bs'

const DashBoard = () => {

  const {active,incomes,expenses} = useGlobalContext()
  const [incomeTotal,setIncomeTotal] = useState(0)
  const [expenseTotal,setExpenseTotal] = useState(0)
  const [balance,setBalance] = useState(0)
  const [incomeMinMax,setIncomeMinMax] = useState({})
  const [expenseMinMax,setExpenseMinMax] = useState({})
  const [negative,setNegative] = useState('')
  const [recent,setRecent] = useState([])

  useEffect(()=>{
    calcTotal()
    setIncomeMinMax(calcMinMax(incomes))
    setExpenseMinMax(calcMinMax(expenses))
    getRecent()
  },[incomes,expenses])

  function calcMinMax(data){
    const min = data?.reduce((acc,item)=>acc>item.amount?item.amount:acc,data[0]?.amount)
    const max = data?.reduce((acc,item)=>acc<item.amount?item.amount:acc,data[0]?.amount)
    return {min,max}
  }

  function calcTotal(){
    setNegative('')
    const calcIncome = incomes?.reduce((acc,item)=>acc+item?.amount,0)
    const  calcExpense = expenses?.reduce((acc,item)=>acc+item?.amount,0)
    setIncomeTotal(calcIncome)
    setExpenseTotal(calcExpense)
    const calcBalance = calcIncome-calcExpense
    if(calcBalance.toString()[0]==='-') setNegative('-')
    setBalance(Math.abs(calcBalance))
  }

  function getRecent(){
    const allTransaction = [...incomes,...expenses]
    allTransaction.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
    setRecent(allTransaction.slice(0,3))
  }

  return (
    <div className={`page dashboard ${active==='dashboard'?'active':''}`}>
      <div className="dash-head title">
        <h1>Dash Board</h1>
      </div>
      <div className="chart">
        {
          [...incomes,...expenses].length?(
            <Chart />
          ):(
            <div className="no-data">
              No Valid Data Available Add A Entry
            </div>
          )
        }
      </div>
      <div className="recent">
        <h2>Recent</h2>
        <div className="recent-items">
          {
          recent?.map(item=>(
            <div className="recent-item" key={item._id}>
              <div className="recent-item-title"><BsCircleFill className={`mode-dot ${item.type}`}/>{item.title}</div>
              <div className="recent-item-amount"><FaRupeeSign/> {item.amount}</div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="stats">
        <div className="income-total">
          <h2>Total Incomes</h2>
          <p><FaRupeeSign className='rupee-icon'/>{incomeTotal}</p>
        </div>
        <div className="expense-total">
          <h2>Total Expenses</h2>
          <p><FaRupeeSign className='rupee-icon'/>{expenseTotal}</p>
        </div>
        <div className="balance">
          <h2>Balance</h2>
          <p className={`${negative?'negative':''}`}>{negative} <FaRupeeSign className='rupee-icon'/>{balance}</p>
        </div>
      </div>
      <div className="min-max">
        <div className="income">
          <h3>income</h3>
          <div>
            <div className="min">
              <h4>min</h4>
              <p><FaRupeeSign/>{incomeMinMax.min}</p>
            </div>
            <div className="max">
              <h4>max</h4>
              <p><FaRupeeSign/>{incomeMinMax.max}</p>
            </div>
          </div>
        </div>
        <div className="expense">
          <h3>expense</h3>
          <div>
            <div className="min">
              <h4>min</h4>
              <p><FaRupeeSign/>{expenseMinMax.min}</p>
            </div>
            <div className="max">
              <h4>max</h4>
              <p><FaRupeeSign/>{expenseMinMax.max}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard