import React, { useContext, useEffect, useReducer } from 'react'
import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { enqueueSnackbar } from 'notistack'
const globalContext = createContext()

const actions = {
  USER:'USER',
  INCOMES:'INCOMES',
  EXPENSES:'EXPENSES',
  ACTIVE:'ACTIVE',
  INCOME_DATE:'INCOME_DATE',
  EXPENSE_DATE:'EXPENSE_DATE',
  ERROR:'ERROR'
}

const baseUrl = 'https://expencetracker-backend.onrender.com'

export const GlobalContextProvider = ({children}) => {
  
  const navigator = useNavigate()

  //initial state of reducer
  const initialState = {
    user:{},
    incomes:[],
    expenses:[],
    incomeDate:format(new Date,'yyyy-MM'),
    expenseDate:format(new Date,'yyyy-MM'),
    active:'income',
    isErr:false,
  }
  //reducer function
  const reducer = (state,{type,payload}) =>{
    switch(type){
      case actions.USER:
        return {...state,user:payload}
      case actions.INCOMES:
          return {...state,incomes:payload}
      case actions.EXPENSES:
        return {...state,expenses:payload}
      case actions.ACTIVE:
        return {...state,active:payload}
      case actions.INCOME_DATE:
        return {...state,incomeDate:payload}
      case actions.EXPENSE_DATE:
        return {...state,expenseDate:payload}
      case actions.ERROR:
        return {...state,isErr:true}
      default:
        return state
    }
  }
  // useReducer hook
  const [state,dispatch] = useReducer(reducer,initialState)

  const handleSignup= async(e,username,password) =>{
    e.preventDefault()
    //snd request to signup
    try{
      const response = await fetch( `${baseUrl}/user/register`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          username,
          pwd:password
        })
      })
      const data = await response.json()
      // check response
      if(response.ok){
        navigator('/login')
        enqueueSnackbar(data.message,{variant:'success'})
        return
      }
      enqueueSnackbar(data.message,{variant:'error'})
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err)
    }
  }
  
  const handleLogin = async(e,username,password) =>{
    e.preventDefault()
    // send request to login
    try{
      const response = await fetch(`${baseUrl}/user/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username,
          password
        })
      })
      const data=await response.json()
      // check if response in ok
      if(response.ok) {
        console.log(data)
        dispatch({type:actions.USER,payload:data})
        localStorage.setItem('user',JSON.stringify(data))
        getEntries('incomes',data.accessToken)
        getEntries('expenses',data.accessToken)
        navigator('/')
        enqueueSnackbar('You Have Successfully Logged In',{variant:'success'})
        return
      }
      enqueueSnackbar(data.message,{variant:"error"})
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err)
    }
  } 

  async function getEntries(type,accessToken){
    try{
      const response = await fetch(`${baseUrl}/${type}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`bearer ${accessToken}`
        }
      }
        )
        if(response.ok){
          const data = await response.json()
          dispatch({type:actions[`${type.toUpperCase()}`],payload:data})
          console.log(data)
          return
        }
        console.log(await response.json())
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err.message)
    }
  }

  async function deleteEntry(type,dataVar,dataId){
    try{
      const response = await fetch(`${baseUrl}/${type}/${dataId}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${state.user.accessToken}`
        }
      })
      const data = await response.json()
      if(response.ok){
        const remainingData = dataVar?.filter(item=>item._id!==dataId)
        dispatch({type:actions[type.toUpperCase()],payload:remainingData})
        enqueueSnackbar(data.message,{variant:'info'})
      }
      enqueueSnackbar(data.message,{variant:'error'})
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err)
    }
  }

  async function addEntry(type,newItem){
    try{
      const response = await fetch(`${baseUrl}/${type}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${state.user.accessToken}`
        },
        body:JSON.stringify(newItem)
      })
      const data=await response.json()
      if(response.ok){
        getEntries(type,state.user.accessToken)
        enqueueSnackbar('1 Entry Has Been Added',{variant:'success'})
        return
      }
      enqueueSnackbar(data.message,{variant:'error'})
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err.message)
    }
  }

  async function getRefreshToken(){
    const userData = JSON.parse(localStorage.getItem('user'))
    dispatch({type:actions.USER,payload:userData})
    if(!userData) return navigator('/login')
      try{
    const response = await fetch(`${baseUrl}/user/refresh/${userData.refreshToken}`)
    const data =await response.json()
    if(response.ok){
        dispatch({type:actions.USER,payload:data})
        getEntries('incomes',data.accessToken)
        getEntries('expenses',data.accessToken)
        navigator('/')
        return
      }
      navigator('/login')
    }catch(err){
      console.log(err)
      navigator('/login')
    }
  }

  function signoutUser(){
    localStorage.removeItem('user')
    dispatch({type:actions.USER,payload:null})
    navigator('/login')
    enqueueSnackbar('You\'ve Logged Out',{variant:'info'})
  }

  async function deleteUser(){
    try{
      const response = await fetch(`${baseUrl}/user/del-user`,{
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
          'Authorization':`bearer ${state.user.accessToken}`
        }
      })
      const data=await response.json()
      if(response.ok){
        signoutUser()
        enqueueSnackbar('Account Has Been Deleted',{variant:'info'})
        return
      }
      enqueueSnackbar(data.message,{variant:'error'})
    }catch(err){
      dispatch({type:actions.ERROR})
      console.log(err)
    }
  }

  return (
    <globalContext.Provider value={{
      ...state,
      dispatch,
      actions,
      handleSignup,
      handleLogin,
      getEntries,
      getRefreshToken,
      deleteEntry,
      addEntry,
      signoutUser,
      deleteUser,
      navigator
      }}>
      {children}
    </globalContext.Provider>
  )
}

export default function useGlobalContext(){
  return useContext(globalContext)
}
