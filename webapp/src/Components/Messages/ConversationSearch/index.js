import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import './ConversationSearch.css';

export default function ConversationSearch() {
    return (
      <div className="conversation-search">
        <TextField
          type="search"
          variant="outlined"
          className="conversation-search-input"
          placeholder="Search Messages"
          InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            	<IconButton>
              		<SearchIcon/>
              	</IconButton>
            </InputAdornment>
          ),
        }}
        />
      </div>
    );
}