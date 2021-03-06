import React from 'react';
import RootRouter from './Components/router';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core';
import {deepPurple} from '@material-ui/core/colors';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});

function App() {
  return (
    <div className="App">
		<MuiThemeProvider theme={theme}>
    		<RootRouter/>
    	</MuiThemeProvider>
    </div>
  );
}

export default App;
