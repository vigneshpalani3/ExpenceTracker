import React from 'react'
import { FaChartLine } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import useGlobalContext from '../context/GlobalContext';

const NavTab = ({isNavOpen,windowWidth}) => {

  const {user,dispatch,actions,active,signoutUser,deleteUser} = useGlobalContext()

  return (
    <div className={`nav-tab ${isNavOpen?'open':''} ${windowWidth>=1000?'lg':'md'}`} onClick={(e)=>e.stopPropagation()}>
      <div className="profile">
        <div className="profile-img">
          {user?.username?.slice(0,1)?.toUpperCase()}
        </div>
        <div className="username">{
          user?.username?.length>15?`${user?.username?.slice(0,15)}...`:user?.username
          }</div>
      </div>
      <div className="nav">
        <ul>
          <li className={`${active==='dashboard'?'active':''}`} onClick={()=>dispatch({type:actions.ACTIVE,payload:'dashboard'})}><FaChartLine className='icon'/>Dashboard</li>
          <li className={`${active==='income'?'active':''}`} onClick={()=>dispatch({type:actions.ACTIVE,payload:'income'})}><FaMoneyBillTrendUp className='icon'/>Incomes</li>
          <li className={`${active==='expense'?'active':''}`} onClick={()=>dispatch({type:actions.ACTIVE,payload:'expense'})}><FaMoneyBillTransfer className='icon'/>Expenses</li>
        </ul>
      </div>
      <div className="settings">
        <button className="signout" onClick={signoutUser}><FaSignOutAlt/>Sign out</button>
        <button className="del-user" onClick={deleteUser}>Delete Account</button>
      </div>
    </div>
  )
}

export default NavTab