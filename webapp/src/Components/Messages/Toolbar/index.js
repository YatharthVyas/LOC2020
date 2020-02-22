import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Toolbar.css';

export default function Toolbar(props) {
    const { title, leftItems, rightItems } = props;
    return (
      <div className="toolbar">
        <div className="left-items"><Typography variant="h2">{ leftItems }</Typography></div>
        <h1 className="toolbar-title">{ title }</h1>
        <div className="right-items">{ rightItems }</div>
      </div>
    );
}