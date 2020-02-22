import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import socketIOClient from 'socket.io-client';
import $ from 'jquery';

class Stream_BRD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      data: null,
      endpoint: 'http://192.168.225.219:5000',
      ID: null,
      oldid: null,
      text:'',
      message: [{text:'Test',sender:1},{text:'Yeah',sender:0}],
    };
  }

  textEdit = (e) =>{
    this.setState({text:e.target.value})
  }

  postMessage = () =>{
    if(this.state.text!==''){
      this.setState({message:[...this.state.message,{text:this.state.text,sender:0}]});
      this.setState({text:''});
    }
  };

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on('stream', data => this.setState({ data: data }));
    this.setState({ ...this.state, socket: socket });
  }
  startStream = e => {
    var canvas = document.getElementById('preview');
    var context = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 200;

    context.width = canvas.width;
    context.height = canvas.height;

    var video = document.getElementById('video');

    var socket = this.state.socket;

    function logger(msg) {
      $('#logger').text(msg);
    }

    function loadCamera(stream) {
      try {
        video.srcObject = stream;
      } catch (error) {
        video.src = URL.createObjectURL(stream);
      }
      //logger('Camera connected');
    }

    function loadFail() {
      //logger('Camera not connected');
    }

    function viewVideo(video, context) {
      context.drawImage(video, 0, 0, context.width, context.height);
      if ($('#ip').val() !== '') {
        socket.emit('stream', {
          image: canvas.toDataURL('image/jpeg', 0.8),
          id: $('#ip').val(),
        });
      }
    }

    $(function() {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msgGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {
            video: { width: { exact: 640 }, height: { exact: 480 } },
            audio: true,
          },
          loadCamera,
          loadFail
        );
      }

      setInterval(function() {
        viewVideo(video, context);
      }, 5);
    });
  };
  render() {
    return (
      <React.Fragment>
      <Grid container>
        <Grid item xs={6}>
        <video
          src=''
          id='video'
          style={{ width: '700px', height: '350px' }}
          autoPlay={true}
        ></video>

        <canvas style={{ display: 'none' }} id='preview'></canvas>
        <div id='logger'></div>
        <TextField 
          type='text' 
          id='ip' 
          variant="outlined"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
                this.startStream();
            }
          }}
        />
        <Button style={{marginLeft:10,height:55,width:100}} variant="contained" color="primary" id='btn' onClick={this.startStream}>
          Start
        </Button>
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
      </React.Fragment>
    );
  }
}

export default Stream_BRD;
