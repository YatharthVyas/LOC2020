import React,{Component} from 'react';
import './mystyles.css';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import ProfImage from './school.jpeg';

import Line from './line.png';

import Stats from './stats.jpeg';

class Carousel extends Component{
    
     constructor(props){
        super(props)
        this.state={
         
            name:"Siddharth Sanjay Salvi",
        }
    }
    
   
    


    
    
    render(){
                    
        
        
        return(
        <div>
    <div className="grid-container">
        
            <div></div>
            <div><img  className='imagenew' src={ProfImage} alt='Profile Photo'/></div>
            <div className="total1">
            <h3 className="personname2">K.V.P Vidyalaya</h3>
            <h5 className="persontitle2">Nagpur,Maharashtra</h5>
            <p className="persondesc2">This is my desciption.This is my description line 2. This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.This is my description line 2.</p>
            </div>
            <div></div>
        </div>
     <br/>
     <br/>
     <div className="grid-container">
        
            <div></div>
            <div>
            
            <a href='/donation'><button className="btn btn-danger"><h5>Make Donations!</h5></button></a>
            </div>
            <div className="total1">
            <h3 className="personname2">Student Achievements</h3>
            <br />
            <div class="grid"><div><article class="card product-item">
                <header class="card__header">
                    <h1 class="product__title">Shekhar Dubey</h1>
                </header>
                
                <div class="card__content">
                    <h2 class="product__price">SSC:89%, HSC:90%</h2>
                    <p class="product__description"></p>
                </div>
                <div class="card__actions">
                    <button class="btn1">Know More</button>
                </div>
            </article></div>
            <div><article class="card product-item">
                <header class="card__header">
                    <h1 class="product__title">Ravindra Shankar</h1>
                </header>
                
                <div class="card__content">
                    <h2 class="product__price">SSC:90% (State-Topper)</h2>
                    <p class="product__description"></p>
                </div>
                <div class="card__actions">
                    <button class="btn1">Know More</button>
                </div>
            </article></div>
            <div><article class="card product-item">
                <header class="card__header">
                    <h1 class="product__title">Isha Thakur</h1>
                </header>
                
                <div class="card__content">
        <h2 class="product__price">JEE:AIR 1788(Girl Topper 2019)</h2>
                    <p class="product__description"></p>
                </div>
                <div class="card__actions">
                    <button class="btn1">Know More</button>
                </div>
            </article></div></div>
            <p className="persondesc2"></p>
            </div>
            <div></div>
        </div>
        
        <div className="grid-container">
        
            <div></div>
            <div><img  className='stats' src={Stats} alt='Profile Photo'/></div>
            <div className="total1">
            <h3 className="personname2">Overall Statistics</h3>
            <h5 className="persontitle2">This is a line graph of the statistical information</h5>
            {Line}    
            </div>
            <div></div>
        </div>
        
        </div>
         

        )
        
    }
    
}

export default Carousel;