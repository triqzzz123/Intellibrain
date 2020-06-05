import React from 'react';
import './FaceRecogonition.css';

 const FaceRecogonition= ({ImageUrl,box})=>{
       return(
    <div className="center ma">
    <div className="absolute mt2">
    <img id="inputimage" alt=' ' src={ImageUrl} width='500px' height='auto'/>  
    <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div> 
    </div>
      </div>

        )
 }


 export default FaceRecogonition;