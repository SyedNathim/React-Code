import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    const Newuser = user;
    const [conditionMet, setConditionMet] = useState(false);

  useEffect(() => {
    const delayCondition = setTimeout(() => {
      // Set the condition to true after 2 seconds
      setConditionMet(true);
    }, 2000);

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(delayCondition);
  }, []); // Run this effect only once after the initial render

  if(loading){
    console.log('1')
    console.log(Newuser)    
}
if(Newuser){
    console.log('2')
    return children;
}
    
            
            return (
                <>
                { conditionMet ? (

                <Navigate to="/login" state={{from: location}} replace></Navigate>
                ) : (
                    <p>Loading.....</p>
                  )}
                </>
                );
  
   
     
}

export default PrivateRoute