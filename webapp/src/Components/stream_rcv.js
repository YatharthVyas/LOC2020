import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
class Stream_RCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      data: null,
      endpoint: 'http://192.168.225.219:5000',
      ID: null,
      oldid: null,
      text: '',
      message: [],
    };
  }
  textEdit = e => {
    this.setState({ text: e.target.value });
  };

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on('stream', data => {
      this.setState({ data: data });
    });
    socket.on('connection', socket => {
      this.setState({ ...this.state, io: socket });
    });
    socket.on('msg-rcv', data => {
      this.setState({
        message: [
          ...this.state.message,
          { text: data.text, sender: data.sender === 'Change This' ? 0 : 1 },
        ],
      });
    });
    this.setState({ ...this.state, socket: socket });
  }

  postMessage = () => {
    if (this.state.text !== '') {
      this.setState({
        message: [...this.state.message, { text: this.state.text, sender: 0 }],
      });
      this.state.socket.emit('msg-sent', {
        ID: this.state.ID,
        text: this.state.text,
        sender: 'Change this',
      });
      this.setState({ text: '' });
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
      this.state.socket.emit('join-req', this.state.ID);
    }
  };
  render() {
    return (
      <div style={{ marginLeft: 20 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '50%' }}>
            <img
              alt='Video Chat'
              src={this.state.data}
              style={{ width: '720px', height: '480px' }}
            ></img>
            <br></br>
            <br />
            <input
              onChange={this.handleChange}
              name='ID'
              type='text'
              style={{
                height: 35,
                borderRadius: 5,
                boreder: '1px solid lightgray',
                padding: 5,
              }}
            ></input>
            <button
              onClick={this.startStream}
              style={{
                height: 45,
                width: 100,
                marginLeft: 10,
                backgroundColor: '#651fff',
                color: 'white',
                boreder: '1px solid black',
                borderRadius: 5,
              }}
            >
              Start
            </button>
          </div>
          <div style={{ flex: '50%' }}>
            <Paper style={{ height: '74vh', overflow: 'auto' }}>
              <List>
                {this.state.message.map((msg, index) => (
                  <React.Fragment key={index}>
                    {msg.sender === 0 ? (
                      <React.Fragment key={index}>
                        <div
                          align='right'
                          key={index}
                          style={{
                            backgroundColor: '#a5d6a7',
                            border: '2px solid #d3d3d3',
                            borderRadius: '25px 0% 25px 25px',
                            padding: '10px',
                          }}
                        >
                          <Typography style={{ marginRight: '50px' }}>
                            {msg.text}
                          </Typography>
                          <Avatar
                            style={{
                              backgroundColor: 'green',
                              marginRight: 10,
                            }}
                          >
                            You
                          </Avatar>
                        </div>
                        <br />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div
                          align='left'
                          key={index}
                          style={{
                            backgroundColor: '#42a5f5',
                            border: '2px solid #d3d3d3',
                            borderRadius: '0% 25px 25px 25px',
                            padding: '10px',
                          }}
                        >
                          <Avatar style={{ backgroundColor: 'orange' }}>
                            OP
                          </Avatar>
                          <Typography style={{ marginLeft: '40px' }}>
                            {msg.text}
                          </Typography>
                        </div>
                        <br />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
            <TextField
              type='text'
              fullWidth
              value={this.state.text}
              style={{ marginTop: 10 }}
              variant='outlined'
              className='compose-input'
              placeholder='Type a message'
              onChange={this.textEdit}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.postMessage();
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Stream_RCV;
