import React from 'react'
import { GrMoney } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { format } from 'date-fns'
import useGlobalContext from '../context/GlobalContext';

const Transaction = ({data,dataByMonth,selectIcon,type}) => {

  const {deleteEntry} = useGlobalContext()

  return (
    <div className='logs'>{
      dataByMonth?.map(item=>(
        <div className="log" key={item._id}>
          <div className="opt-icon">{selectIcon(item.category)}</div>
          <div className="details">
            <div className="item-title">{item.title}</div>
            <div className="other-details">
              <div className="amount"><FaDollarSign className='other-detail-icon'/>{item.amount}</div>
              <div className="date"><FaCalendar className='other-detail-icon'/>{format(item.date,'dd/MM/yyyy')}</div>
              <div className="description"><FaMessage className='other-detail-icon'/>{item.description}</div>
            </div>
          </div>
          <div className="del-button"><button onClick={()=>deleteEntry(type,data,item._id)}><MdDelete /></button></div>
        </div>
      ))
    }
    </div>
  )
}

export default Transaction