import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import deepPurple from '@material-ui/core/colors/deepPurple';
import deepOrange from '@material-ui/core/colors/deepOrange';
import red from '@material-ui/core/colors/red';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles({
    root: {
      width: '20%',
      height : '40%'
    },
  });
  const cardimg = {
      height: '60%',
      width : '60%',
      marginLeft : '20%'
  }

const paycolor = deepPurple[200]
const payColor = {
    backgroundColor : paycolor
}
const majorGrid = {
    marginTop : '30vh',
    marginLeft : '25vw',
    width : '75vw',
    overflow : 'hidden',
    //position:'fixed'


}
const blessButt = red['#d50000'];

const majorButton = {
    marginTop : '2vw',
    width : '35vw',
    backgroundColor : blessButt
}


const Donation = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

return(
    <div style={{ height: '100vh', width : '100vw',  background: 'linear-gradient(to right bottom, #bdbdbd, #212121 )', position:'absolute', marginTop:0, overflow:0 }}>
    <Grid container style={majorGrid} spacing={5}>
    <Grid item xs={4}>
        <Card >
      <CardActionArea >
        <CardMedia
        style={cardimg}
          component="img"
          alt="Contemplative Reptile"
          
          src="https://png2.cleanpng.com/sh/7bdc23514c0f8cf7916d9c3f3c55591c/L0KzQYm3V8E1N6N2R91yc4Pzfri0hB9wb51qReJqeT3qf7FujPUudJDsh595YYnwdbB7TfJ2e5pzfeV8LYPyc7rojL1vbaV8hAR0LUXlRLLpUBVmQJI7eqs5Lke6SIi6WMA5OWY4Sag7MkO7Qoa9V75xdpg=/kisspng-google-pay-google-logo-payment-business-social-network-5b4ab3ee8a6b90.778738081531622382567.png"
          title="Contemplative Reptile"
        />
        <CardContent style={payColor}>
          <Typography gutterBottom variant="h4" component="h2">
            GPay
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>
    </Grid>
    
    <Grid item xs={4}>
    <Card >
      <CardActionArea >
        <CardMedia
        style={cardimg}
          component="img"
          alt="Contemplative Reptile"
          
          src="https://www.searchpng.com/wp-content/uploads/2019/01/Bhim-PNG-Icon-715x715.png"
          title="Contemplative Reptile"
        />
        <CardContent style={payColor}>
          <Typography gutterBottom variant="h4" component="h2">
            BHIM
          </Typography>
          
        </CardContent>
      </CardActionArea>
      
    </Card>
    </Grid>
    </Grid>
    <Button variant="contained" color="secondary" style={majorButton} onClick={handleClickOpen}>
        <b>Give a Blessing....</b>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <img src='https://lh6.ggpht.com/xOYWYB430Gi-AdVsSO1oJhVeFnUi8OxoXElXThqELub626vtj41AVQmvl2ltPmNJsw6dFq8' style={{width:'80px', height:'80px', marginLeft:'45%', marginTop:'5px'}}/>
        <DialogTitle id="form-dialog-title">DONATE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make a donation to this website, please fill the following details carefully.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cardname"
            label="Card Number"
            type="text"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="mmyy"
            label="MM/YY"
            type="text"
            style={{marginLeft : '20px'}}
            
          />
         
          <TextField
            autoFocus
            margin="dense"
            id="cvc"
            label="CVC"
            type="text"
            
          />
           <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount(INR)"
            style={{marginLeft : '20px'}}
            type="number"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Card Holder Name"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="baddress"
            label="Biling Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            PAY
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
)

}


export default Donation;

