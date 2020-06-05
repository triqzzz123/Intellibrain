import React from 'react';

 class  Signin extends React.Component{
   constructor(props){
    super(props)
this.state={

  SigninEmail:" ",
  SigninPassword:''
       }
   
  }

  onEmailchange=(event)=>{
   this.setState({
     SigninEmail:event.target.value

   })
}

onPasswordchange=(event)=>{
 this.setState({
SigninPassword:event.target.value

 })
}

onSubmitchange=()=>{
  
  console.log(this.state)

  fetch("https://radiant-reaches-09999.herokuapp.com/signin",{
    method:'post',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      email:this.state.SigninEmail,
      password:this.state.SigninPassword
 })
}).then(resp=>resp.json()).then(user =>{
    if (user.id){
      this.props.loaduser(user);
      this.props.routechange("home");
    }
      } )
    }


     render(){
      const {routechange}=this.props;
      return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
       <main className="pa4 black-80">
       <div className="measure ">
         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
           <legend className="f1  fw6 ph0 mh0">Sign In</legend>
           <div className="mt3">
             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
             <input onChange={this.onEmailchange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
           </div>
           <div className="mv3">
             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
             <input onChange={this.onPasswordchange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
           </div>
         </fieldset>
         <div className="">
           <input onClick={this.onSubmitchange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"  type="submit" value="Sign in"/>
         </div>
         <div className="lh-copy mt3">
           <p onClick={(e)=>routechange("register")}  className="f5 link dim black db pointer">register</p>
         
         </div>
       </div>
     </main>
     </article>
 )
       
      }
 }


 export default Signin;