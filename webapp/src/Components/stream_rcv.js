import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
class Stream_RCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      data: null,
      endpoint: 'http://192.168.225.219:5000',
      ID: null,
      oldid: null,
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on('stream', data => this.setState({ data: data }));
    this.setState({ ...this.state, socket: socket });
  }
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
      <div>
        <img
          src={this.state.data}
          style={{ width: '720px', height: '480px' }}
        ></img>
        <br></br>
        <input onChange={this.handleChange} name='ID' type='text'></input>
        <button onClick={this.startStream}>Start</button>
      </div>
    );
  }
}

export default Stream_RCV;
