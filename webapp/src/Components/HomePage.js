import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green'
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PhoneIcon from '@material-ui/icons/Phone';
import CopyrightIcon from '@material-ui/icons/Copyright';


import './styles.css';

const firstcolor = yellow[200];
const secondcolor = pink[100];
const thirdcolor = teal[200];
const fourthcolor = green[200];
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
      

    },
  }));
  
  var firstpap = {
      width : '100vw',
      height : '95vh',
      //marginLeft:'2vw',
      display :'inline-block',
      marginTop : '20vh',
      //backgroundColor : firstcolor
  }
  var firstimg = {
    height:'100vh', width:'99vw',// marginLeft:'12px' 
    filter: 'brightness(25%)'
  }
  var secimg = {
    height:'24vh', width:'15vw', marginLeft:'0px',display: 'flex',
  }
  var thirdimg={
    height:'60vh', width:'65vw', marginLeft:'0px',//display: 'flex',

  }
  var features = {
    width : '30vw',
    height : '24vh',
    //marginLeft:'2vw',
    display: 'flex',
    marginTop : '5vh',
    marginBottom : '2vh',
    marginLeft:'36%'
    //backgroundColor : firstcolor

  }
  var contact={
    width : '90vw',
    height : '60vh',
    //marginLeft:'2vw',
    display: 'flex',
    marginTop : '5vh',
    marginBottom : '2vh',
    marginLeft:'5vw'
    //backgroundColor : firstcolor

  }
  


const HomePage = () => {

    const classes = useStyles();

    return (
      <div >
        
        <div className="container">
        <img style={firstimg} src="https://files.globalgiving.org/pfil/24366/pict_large.jpg?m=1466249018000"></img>
        <div className="centered">Gyaan Ashray</div>

        <div className="centered1">-Fabricating the Future...</div>
        </div>
        
        


        <Card style={features}>
      
        <CardContent className={classes.content} style={{background : secondcolor}}>
          <Typography component="h5" variant="h5">
            24/7 doubt solving
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Forum & Chat
          </Typography>
        </CardContent>
        
      
      <CardMedia
        style={secimg}
        
        image="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/4e402f65474343.5af54e0f1504e.jpg"
        title="Live from space album cover"
      ></CardMedia>
    </Card>
    <Card style={features}>
    <CardMedia
        style={secimg }
        style={{width:'15vw'}}
        image="https://weandthecolor.com/wp-content/uploads/2019/10/Editorial-illustrations-created-by-Bruno-Mangyoku-from-2018-2019.jpg"
        title="Live from space album cover"
      ></CardMedia>
      
        <CardContent className={classes.content} style={{background : thirdcolor}}>
          <Typography component="h5" variant="h5">
            Learn from the Best!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            E-Learning
          </Typography>
        </CardContent>
        
      
      
    </Card>
    <Card style={features}>
      
        <CardContent className={classes.content} style={{background : fourthcolor}}>
          <Typography component="h5" variant="h5">
            Refer the Efficient Material
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Top Resources
          </Typography>
        </CardContent>
        
      
      <CardMedia
        style={secimg}
        image="https://mymodernmet.com/wp/wp-content/uploads/2018/12/stephan-schmitz-illustrations-5.jpg"
        title="Live from space album cover"
      ></CardMedia>
    </Card>
    <hr/>
    <Card style={contact}>
    <CardMedia
        style={thirdimg }
        //style={{width:'15vw'}}
        image="https://agentpekka.com/wp-content/uploads/2020/02/AP_Sebastien_Plassard_mandarin-downtown-doha_2x.jpg"
        title="Live from space album cover"
      ></CardMedia>
      
        <CardContent style={{width:'40vw'}} >
          <Typography component="h5" variant="h5">
            <b>Contact Us</b> 
          </Typography>
          
          <Typography style={{marginTop:'1.8vw'}} variant="h5" color="textSecondary">
            <PhoneIcon /> +91 9256378135
          </Typography>
          <Typography style={{marginTop:'1.8vw'}} variant="h5" color="textSecondary">
          <PhoneIcon /> +91 9256378826
          </Typography>
          <Typography style={{marginTop:'1.8vw'}} variant="h5" color="textSecondary">
            <LocationOnIcon / > Golkuldham Society, Powder Gully, Goregaon(E), Mumbai - 400420
          </Typography>
          <Typography style={{marginTop:'1.8vw'}} variant="h5" color="textSecondary">
            <QueryBuilderIcon /> Office Hours - 10 am - 8 pm (Mon-Fri)
          </Typography>
        </CardContent>
        
      
      
    </Card>
    
    
      </div>
    );

}
export default HomePage;