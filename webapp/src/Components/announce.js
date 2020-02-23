import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';

function Event(){
	return(
		<React.Fragment>
			<Typography variant="h3">Schedule a Lecture</Typography>
			<Divider style={{width:'50vw',marginLeft:'25vw'}}/>
			<Formik
        		initialValues={{ topic: '', time: '12:00' ,date: '2020-01-01',call_id: ''}}
        		onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
                  console.log(values);
              	}}
              	>
              	{({
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  values
                }) => (

                <div align="center" style={{padding: 20,width:'60vw',marginLeft:'20vw'}}>
						<Form>
						<TextField name="topic" variant="filled" label="Subject/Topic" fullWidth onBlur={handleBlur} onChange={handleChange}/><br/><br/>						
						<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField name="time" value={values.time} type="time" fullWidth variant="filled" label="Time" onBlur={handleBlur} onChange={handleChange}/>
						</Grid>
						<Grid item xs={6}>
							<TextField name="date" value={values.date} type="date" fullWidth variant="filled" label="Date" onBlur={handleBlur} onChange={handleChange}/>
						</Grid>
						</Grid><br/>
						<TextField name="call_id" fullWidth variant="filled" label="Call ID" onBlur={handleBlur} onChange={handleChange}/>
						<br/><br/><Button type="submit" disabled={isSubmitting} variant="contained" color="primary"> Schedule Event </Button>
						</Form>
					</div> )}
              	</Formik>
            <Divider style={{width:'80vw',marginLeft:'10vw'}}/>
		</React.Fragment>
	);
}

export default Event;