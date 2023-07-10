import React,{useState} from 'react'
import alertContext from './alertContext'

const AlertState = ({children}) => {
    const [alert,setAlert]=useState(null);
    const showAlert=(message,type)=>{
        setAlert({
          msg:message,
          type:type
        })
        setTimeout(()=>{
          setAlert(null);
        },1500);
      }
    
  return (
    <alertContext.Provider value={{alert,showAlert}}>
    {children}
  </alertContext.Provider>
  )
}


export default AlertState
