import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chatBox: {
    height: '74vh',
    overflow: 'auto'
  },
}));

function ChatApp() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  const [text,setText]=React.useState('');
  const textEdit = (e) =>{
    setText(e.target.value);
  }
  const users=['Karan','Mohit','Vatsal','Tejas','Sarvesh','Rahil','Caren','Siddharth','Shrey','Yashodhan'];
  const [Message,sendMessage]=React.useState([{text:'Test',sender:1},{text:'Yeah',sender:0}]); //sender id = 0 for me and any other id for other user
  const postMessage = () =>{
    if(text!==''){
      sendMessage([...Message,{text:text,sender:0}]);
      setText('');
      setOpen(true);
    }
  }
  return (
    <Box>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message="Message Sent"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
  		<Grid container spacing={0}>
        <Grid item xs={4}>
          <List className={classes.root}>
          {users.map((data,key)=>(
            <React.Fragment key={key}>
            <div>
              <ListItem key={key}>
                <ListItemAvatar><Avatar style={{backgroundColor:'darkorange'}}> {data[0]}  </Avatar></ListItemAvatar>
                <ListItemText> {data} </ListItemText>
              </ListItem>
              <Divider/>
              </div>
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
        <Paper className={classes.chatBox}>
        <List>
          {Message.map((msg,index)=>(
            <React.Fragment key={index}>
            {msg.sender===0?
              <React.Fragment key={index}>
              <div align="right" key={index} style={{backgroundColor:'#a5d6a7',border:"2px solid #d3d3d3",borderRadius:"25px 0% 25px 25px",padding:'10px'}}>
                  <Typography style={{marginRight:'50px'}}>{msg.text}</Typography>  
                  <Avatar style={{backgroundColor:'green',marginRight:10}}>You</Avatar>
              </div>
              <br/>
              </React.Fragment>
              :
              <React.Fragment>
              <div align="left" key={index} style={{backgroundColor:'#42a5f5',border:"2px solid #d3d3d3",borderRadius:"0% 25px 25px 25px",padding:'10px'}}>
                  <Avatar style={{backgroundColor:'darkblue'}}>OP</Avatar>
                 <Typography style={{marginLeft:'40px'}}>{msg.text}</Typography> 
              </div>
              <br/>
              </React.Fragment> 
            }
            </React.Fragment>
            ))
          }
          </List>
        </Paper>
        <TextField
          type="text"
          fullWidth
          value={text}
          style={{marginTop:10}}
          variant="outlined"
          className="compose-input"
          placeholder="Type a message"
          onChange={textEdit}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
                postMessage();
            }
          }}
          InputProps={{
          endAdornment: (
            <React.Fragment>
            <InputAdornment position="end">
            <input
              accept="image/*"
              style={{display:'none'}}
              id="contained-button-file"
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <IconButton fab variant="raised" component="span">
                <AttachFileIcon/>
              </IconButton>
           </label>
            </InputAdornment>
            <InputAdornment position="end">
              <IconButton onClick={postMessage}>
                <SendIcon/>
                </IconButton>
            </InputAdornment>
            </React.Fragment>
          ),
        }}
        />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatApp;
