import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CreateIcon from '@material-ui/icons/Create';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';

let check = 0;
const useStyles = makeStyles(theme => ({
  root: {
    //maxWidth: 345,
    width: '70vw',
    marginTop: '2vw',
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const colorReply = pink[50];
const colorAnswer = green[100];

var FQANS = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var replyStyle = {
    //width: '80%',
    transitionDuration: '0.3s',
    //height: '50%',
    backgroundColor: colorReply,
  };
  var answerStyle = {
    backgroundColor: colorAnswer,
  };
  const [answers, setAnswers] = useState([]);
  const [value, setValue] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    $.post('http://192.168.225.219:5000/forumA', {
      ID: props.location.state.wq.ID,
      Ans: value,
      user: 'testU',
      ins: 'testU',
    })
      .done(data => console.log(data))
      .fail(e => console.log(e));
    setAnswers([...answers, { user: 'YJ', text: value, institute: 'Check' }]);

    setValue('');
  };
  if (check === 0) {
    setAnswers(props.location.state.answers);
    ++check;
  }
  return (
    <div style={{ marginLeft: '15%', height: '100vh', width: '100vh' }}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {props.location.state.wq.user.toUpperCase()[0]}
            </Avatar>
          }
        />

        <CardContent>
          <Typography variant='h4' color='textPrimary' component='p'>
            {props.location.state.question.text}
          </Typography>
          <div> Answers : {answers.length}</div>
          <div>Topic : {props.location.state.question.topic}</div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <CreateIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {answers.map(answer => (
            <CardContent style={replyStyle}>
              <CardHeader
                avatar={
                  <Avatar aria-label='recipe' className={classes.avatar}>
                    {answer.user ? answer.user : 'U'}
                  </Avatar>
                }
                title={answer.user ? answer.user : 'U'}
                subheader={answer.institute}
              />

              <CardContent>
                <Typography variant='h6' color='textPrimary' component='p'>
                  {answer.text}
                </Typography>
              </CardContent>

              <hr />
            </CardContent>
          ))}
        </Collapse>
        <form onSubmit={handleSubmit}>
          <TextField
            id='filled-basic'
            label='Post an Answer...'
            variant='filled'
            value={value}
            onChange={e => setValue(e.target.value)}
            style={answerStyle}
            fullWidth
          />
        </form>
      </Card>
    </div>
  );
};

export default FQANS;
