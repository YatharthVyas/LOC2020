import React, { Component } from 'react';
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
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;

    const socket = socketIOClient(endpoint);

    socket.on('stream', data => this.setState({ data: data }));
    this.setState({ ...this.state, socket: socket });
  }
  startStream = e => {
    var canvas = document.getElementById('preview');
    var context = canvas.getContext('2d');

    canvas.width = 90;
    canvas.height = 70;

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
      if ($('#ip').val() != '') {
        socket.emit('stream', {
          image: canvas.toDataURL('image/webp'),
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
        <video
          src=''
          id='video'
          style={{ width: '700px', height: '350px' }}
          autoPlay={true}
        ></video>

        <canvas style={{ display: 'none' }} id='preview'></canvas>
        <div id='logger'></div>
        <input type='text' id='ip' />
        <button id='btn' onClick={this.startStream}>
          Start
        </button>
      </React.Fragment>
    );
  }
}

export default Stream_BRD;
