import React,{Component} from 'react';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecogonition from  './components/FaceRecogonition/FaceRecogonition';
import Signin from './components/signin/Signin';
import Register from './components/Register/Register';


import 'tachyons';
import './App.css';




const particlesoptions={
  particles: {
    number:{
      value:118,
    density:{
      enable:true,
      value_area:1100
    }       
}
}
}

const initialState={
  input:'',
  imageUrl:'',
  box:{},
  route:'signin',
  isSignedin:false,
  user:{
  name:'',
   id:'',
   email:'',
   entries:0,
   joined:''

}

}
 

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
 }

 loadUser=(data)=>{
   this.setState({
     user:{
     name:data.name,
     id:data.id,
     email:data.email,
     entries:data.entries,
     joined:data.joined
    }
})

 }


  calculateFacelocation=(data)=>
  { 
   const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
   const image=document.getElementById('inputimage');
   const width=Number(image.width);
   const height=Number(image.height);
   return{
     leftCol:clarifaiFace.left_col*width,
     topRow:clarifaiFace.top_row*height,
     rightCol:width -(clarifaiFace.right_col*width),
     bottomRow:height -(clarifaiFace.bottom_row*height)
   }
  }

  displayFacebox=(box)=>{
    this.setState({
      box:box
    })
    
  }

  onRoutechange=(route)=>{
    if (route==='signout'){
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({
       isSignedin:true 
      })  
    }
    this.setState({
      route:route
    })

  }
  

  onInputChange=(event)=>{
    this.setState({input:event.target.value});

  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    fetch("https://radiant-reaches-09999.herokuapp.com/imageUrl",{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
        })
      })
    
      .then(response=>response.json())
    .then( response=> {
    if(response){
      fetch("https://radiant-reaches-09999.herokuapp.com:/images",{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
          })
    }).then(response=>response.json()).then(counter=>{

      this.setState(Object.assign(this.state.user,{
        entries:counter
      }))
    }).catch(console.log)
}
this.displayFacebox(this.calculateFacelocation(response))
})
  .catch(error=>console.log(error))
    }
  

  render(){
    const{isSignedin,box,imageUrl,route}=this.state;
    return(
    <div className="App">
    <Particles className="particles" params={particlesoptions} />
    <Navigation isSignedIn={isSignedin} routechange={this.onRoutechange} />{route === "home" ?<div>
    <Logo/>
    <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecogonition box={box} ImageUrl={imageUrl}/>
       </div>:(route ==="signin"?
       <Signin loaduser={this.loadUser} routechange={this.onRoutechange}/>: <Register routechange={this.onRoutechange}  loaduser={this.loadUser}/>)
       }
    </div>
  )
}
}

export default App;
