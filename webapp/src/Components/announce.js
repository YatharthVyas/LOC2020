import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import $ from 'jquery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';

function Event() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [arrEvents, setEvents] = React.useState([]);
  useEffect(() => {
    $.get('http://localhost:5000/events')
      .done(data => {
        setIsLoading(false);
        setEvents(data);
      })
      .fail(e => {
        setIsLoading(false);
        console.log(e);
      });
  });
  //===================================================
  return (
    <React.Fragment>
      <Typography variant='h3'>Schedule a Lecture</Typography>
      <Divider style={{ width: '50vw', marginLeft: '25vw' }} />
      <Formik
        initialValues={{
          topic: '',
          time: '12:00',
          date: '2020-01-01',
          call_id: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 1000);
          setIsLoading(true);
          let obj = {
            user: 'TestUser',
            time: values.time,
            date: values.date,
            subject: values.topic,
            callId: values.call_id,
          };
          $.post('http://localhost:5000/events', obj)
            .done(data => {
              setIsLoading(false);
              setEvents([obj, ...arrEvents]);
            })
            .fail(e => {
              setIsLoading(false);
              console.log(e);
            });
        }}
      >
        {({ isSubmitting, handleChange, handleBlur, values }) => (
          <div
            align='center'
            style={{ padding: 20, width: '60vw', marginLeft: '20vw' }}
          >
            <Form>
              <TextField
                name='topic'
                variant='filled'
                label='Subject/Topic'
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <br />
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name='time'
                    value={values.time}
                    type='time'
                    fullWidth
                    variant='filled'
                    label='Time'
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name='date'
                    value={values.date}
                    type='date'
                    fullWidth
                    variant='filled'
                    label='Date'
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <br />
              <TextField
                name='call_id'
                fullWidth
                variant='filled'
                label='Call ID'
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <br />
              <br />
              <Button
                type='submit'
                disabled={isSubmitting}
                variant='contained'
                color='primary'
              >
                {' '}
                Schedule Event{' '}
              </Button>
            </Form>
          </div>
        )}
      </Formik>
      <Divider style={{ width: '80vw', marginLeft: '10vw' }} />
      <List>
        {isLoading ? (
          <CircularProgress />
        ) : (
          arrEvents.map((val, index) => (
            <ListItem key={index}>
              {
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label='recipe'>
                        {val.user.toUpperCase()[0]}
                      </Avatar>
                    }
                  />

                  <CardContent>
                    <Typography variant='h4' color='textPrimary' component='p'>
                      {val.subject}
                    </Typography>
                    <div> Date : {val.date}</div>
                    <div>Time : {val.time}</div>
                    <div>Call Id : {val.callId}</div>
                  </CardContent>
                </Card>
              }
            </ListItem>
          ))
        )}
      </List>
    </React.Fragment>
  );
}

export default Event;
