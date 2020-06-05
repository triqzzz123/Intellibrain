import React from 'react';

 const Navigation= ({routechange,isSignedIn})=>{
      if (isSignedIn){
    return(   
    <nav style={{display:'flex' ,justifyContent:'flex-end'}}>
    <p onClick={()=>routechange("signout")} className='f3 link dim black underline pa3 pointer '> 
    sign out
    </p>
    </nav>)
    } else {
    return (
        <nav style={{display:'flex' ,justifyContent:'flex-end'}}>
        <p onClick={()=>routechange("signin")} className='f3 link dim black underline pa3 pointer '> 
        sign in
        </p> 
        <p onClick={()=>routechange("register")} className='f3 link dim black underline pa3 pointer '> 
        Register
        </p>  
        </nav>
    )
    }
    


 }


 export default Navigation;