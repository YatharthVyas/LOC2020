import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
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
    height: '90%'
  },
}));

function ChatApp() {
  const classes = useStyles();
  const users=['Me','You','They','Ley','Brock','Example','ACM','Siddharth Salvi','Shrey','Yashodhan'];
  const [Message,sendMessage]=React.useState([{text:'Test',sender:1},{text:'Yeah, ',sender:0}]); //sender id = 0 for me and any other id for other user

  return (
    <Box>
  		<Grid container spacing={0}>
        <Grid item xs={4}>
          <List className={classes.root}>
          {users.map((data,key)=>(
            <React.Fragment>
              <ListItem key={key}>
                <ListItemAvatar><Avatar style={{backgroundColor:'darkorange'}}> {data[0]}  </Avatar></ListItemAvatar>
                <ListItemText> {data} </ListItemText>
              </ListItem>
              <Divider/>
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
        <Paper fullWidth className={classes.chatBox}>
        <List>
          {Message.map((msg,index)=>(
            <React.Fragment>
            {msg.sender===0?
              <div align="right" >
                  <Typography>{msg.text}</Typography>  
                  <Avatar style={{backgroundColor:'green',marginRight:0}}>You</Avatar>
              </div>
              :
              <div width="80%" style={{backgroundColor:"#ECCCCF"}}>
                <ListItem key={index}>
                  <Avatar style={{backgroundColor:'orange'}}>OP</Avatar>
                 <Typography>{msg.text}</Typography>  
                 </ListItem>
              </div>
            }
            </React.Fragment>
            ))
          }
          </List>
        </Paper>
        <TextField
          type="text"
          fullWidth
          style={{marginTop:10}}
          variant="outlined"
          className="compose-input"
          placeholder="Type a message, @name"
          InputProps={{
          endAdornment: (
            <React.Fragment>
            <InputAdornment position="end">
              <IconButton>
                <AttachFileIcon/>
                </IconButton>
            </InputAdornment>
            <InputAdornment position="end">
              <IconButton>
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
