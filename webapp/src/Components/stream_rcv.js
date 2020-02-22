import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
class Stream_RCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      data: null,
      endpoint: 'http://192.168.225.219:5000',
      ID: null,
      oldid: null,
      text:'',
      message:[{text:'Test',sender:1},{text:'Yeah',sender:0}],
    };
  }
  textEdit = (e) =>{
    this.setState({text:e.target.value})
  }

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on('stream', data => this.setState({ data: data }));
    this.setState({ ...this.state, socket: socket });
  }

  postMessage = () =>{
    if(this.state.text!==''){
      this.setState({message:[...this.state.message,{text:this.state.text,sender:0}]});
      this.setState({text:''});
    }
  };

  handleChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  startStream = e => {
    if (this.state.ID) {
      if (this.state.oldid == null) {
        this.setState({ ...this.state, oldid: this.state.ID });
      } else {
        this.state.socket.emit('recv-logout', this.state.oldid);
        this.setState({ ...this.state, oldid: this.state.ID });
      }
      this.state.socket.emit('recv-login', this.state.ID);
    }
  };
  render() {
    return (
      <div style={{marginLeft:20}}>
        <Grid container>
        <Grid item xs={6}>
          <img
            src={this.state.data}
            style={{ width: '720px', height: '480px' }}
          ></img>
          <br></br><br/>
          <TextField 
            label="Call ID" 
            variant="outlined" 
            placeholder="Enter Your Call ID" 
            onChange={this.handleChange} 
            name='ID' 
            type='text'
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                  this.startStream();
              }
            }}
          /> 
        <Button style={{marginLeft:10,height:55,width:100}} variant="contained" color="primary" onClick={this.startStream}>Start</Button>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{height: '74vh',overflow: 'auto'}}>
        <List>
          {this.state.message.map((msg,index)=>(
            <React.Fragment key={index}>
            {msg.sender===0?
              <React.Fragment key={index}>
              <div align="right" key={index} style={{border:"2px solid #d3d3d3",borderRadius:"25px 0% 25px 25px",padding:'10px'}}>
                  <Typography style={{marginRight:'50px'}}>{msg.text}</Typography>  
                  <Avatar style={{backgroundColor:'green',marginRight:10}}>You</Avatar>
              </div>
              <br/>
              </React.Fragment>
              :
              <React.Fragment>
              <div align="left" key={index} style={{border:"2px solid #d3d3d3",borderRadius:"0% 25px 25px 25px",padding:'10px'}}>
                  <Avatar style={{backgroundColor:'orange'}}>OP</Avatar>
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
          value={this.state.text}
          style={{marginTop:10}}
          variant="outlined"
          className="compose-input"
          placeholder="Type a message"
          onChange={this.textEdit}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
                this.postMessage();
            }
          }}
          InputProps={{
          endAdornment: (
            <React.Fragment>
            <InputAdornment position="end">
              <IconButton onClick={this.postMessage}>
                <SendIcon/>
                </IconButton>
            </InputAdornment>
            </React.Fragment>
          ),
        }}
        />
        </Grid>
        </Grid>
      </div>
    );
  }
}

export default Stream_RCV;
