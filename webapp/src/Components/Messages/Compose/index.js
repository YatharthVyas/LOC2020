import React from 'react';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import './Compose.css';

export default function Compose(props) {
    return (
      <div className="compose">
        <TextField
          type="text"
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
        {
          props.rightItems
        }
      </div>
    );
}