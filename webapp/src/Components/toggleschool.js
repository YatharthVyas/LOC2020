import React,{Component} from 'react';
import './mystyles.css';
import Backdrop from '@material-ui/core/Backdrop';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';


import Image1 from './school.jpeg';
class Profile extends Component{
    
     constructor(props){
        super(props)
        this.state={
         
          search:"",
          prof:[
              
              {
              id:1,  
              name:"K.V.P Vidyalaya",
              CurrentStatus:"Secondary School",
              University:"",
              Country:"Sinnar,Maharashtra",
              Company:""
              },
              {
              id:2,  
              name:"S.V.K.M Vidyalaya",
              CurrentStatus:"Higher Secondary School",
              University:"",
              Country:"Latur,Maharashtra",
              Company:""
              },
              {
                id:2,  
                name:"C.V School",
                CurrentStatus:"Primary School",
                University:"",
                Country:"Latur,Maharashtra",
                Company:""
                }
              
              ],
          term:"",
          showPerson:false
          
        }
    }
    

    handleInputChange1 = (event) =>{
        
      this.setState({term:event.target.value});
      const doesShow = this.state.showPerson;
  this.setState({
      
      showPerson:!doesShow
  });
  
  
  }
    
    render(){

      
                    
      let filtered = this.state.prof.filter(
        
        (person)=>{
            
            return (person.name.includes(this.state.term)||person.University.includes(this.state.term));
        }
    
    );                
    
    let ngos = (
<div>
    
{filtered.map((person)=>{

 return(

  <div className="grid">
            <article className="card product-item">
                <header className="card__header">
 <h3 className="product__title">{person.name}</h3>
                </header>
                <div className="card__image">
                    <img className="imagenew" src={Image1} alt="A Book"/>
                </div>
                <div className="card__content">
 <h4 className="product__price"></h4>
 <h5 className="product__description">{person.Country}</h5>
                </div>
                <div className="card__actions">
                    <a href="/institute_dash"><button className="btn1">View Profile</button></a>
                </div>
            </article>
        </div>    
        
  
 );
 
})}
</div>

)
   
        
    return(
     <div> 
      <img className="gif" src="https://cdn.dribbble.com/users/1791559/screenshots/4441947/gif_icon.gif" alt="Picture"/> 
    <h1 className="aboutus">PROFILE</h1>
    <br />
    <br />
    <div>
    <TextField id="outlined-basic" label="Search By Name" variant="outlined" onChange={this.handleInputChange1}  />
    <TextField id="outlined-basic" label="Search By University" variant="outlined" onChange={this.handleInputChange1}  />
    </div>
    <br />
    <div className="sid">
    {ngos}
    </div>

    </div>
    );    
    }
    
}

export default Profile;