import React from 'react';
import {Typography,AppBar,Button,MenuItem,Tabs,Tab,Grid,Box,makeStyles,TextField} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Formik,Form} from 'formik';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 500,
    margin: 'auto',
    flexGrow: 1
  },
  textf: {
  	marginTop: 20
  },
  box: {
  	alignItems: 'center',
  }
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}


export default function LoginPage(){
	const classes = useStyles();
  	const [value, setValue] = React.useState(0);
  	const handleTabChange = (event, newValue) => {
    	setValue(newValue);
	};
	const [isLogged, setLog] = React.useState(false);
	const setLogFunc = (event) => {
    	setLog(true);
	};
	const [isV, setV] = React.useState(false);
	const setVFunc = (event) => {
    	setLog(true);
	};
	const [showPassword, setShowPassword] = React.useState(0);
	function togglePassword(){
		showPassword===0?setShowPassword(1):setShowPassword(0);
	}
    return (
    	<div>
			{(isLogged && isV) ? <Redirect to='/v_home' />:null}
			{(isLogged && !isV) ? <Redirect to='/ngo_home' />:null}
        		<div className={classes.root}>
	        		<AppBar position="static">
			        <Tabs value={value} variant="fullWidth" TabIndicatorProps={{
					    style: {
					      backgroundColor: "#FFFFFF",
					      height: '5px'
					    }
					}} onChange={handleTabChange} aria-label="simple tabs example">
			          <Tab label="Log In" {...a11yProps(0)} />
			          <Tab label="Sign Up" {...a11yProps(1)} />
			        </Tabs>
			      </AppBar>
			      <TabPanel value={value} index={0}>
			        <Formik 
			        	initialValues={{ username: '', password: '' }}
			        	validate={values => {
				        const errors = {};
				        if (!values.username) {
				          errors.username = 'Required';
				        }
				        if (!values.password){
				        	errors.password = 'Required';
				        }
				        return errors;
					  }}
					  //Login
				      onSubmit={async (values, { setSubmitting }) => {
				        setTimeout(() => {
				          setSubmitting(false);
						}, 1000);
						console.log(values);
						try{
							let temp = await Axios.post('/api/volunteers/login',{username:values.username,password:values.password});
							setLogFunc();
							setVFunc();
							//console.log(temp.data)
						}catch(e){
							try{
								let temp = await Axios.post('/api/NGO/login',{username:values.username,password:values.password});
								setLog();
								console.log(temp.data);
							}catch(e){
								console.log(e.response)
							}
							
						}
				        //console.log(values);
				    }}>
				    {({ isSubmitting ,handleChange,handleBlur,errors,touched}) => (
				    	<Box className={classes.box}>
				    	<Form autoComplete="off"> 
				        	<TextField 
				        		name="username"
				        		style = {{width: 300}}
				        		label="Username" 
				        		variant="outlined" 
				        		placeholder="Enter your Username"
				        		error={!!errors.username&&touched.username}
				        		helperText={touched.username?errors.username:''}
				        		onChange={handleChange}
				        		onBlur={handleBlur}
				        	/> <br/>
				        	<TextField 
				        		name="password" 
				        		style = {{width: 300}}
				        		type="password" 
				        		label="Password" 
				        		variant="outlined" 
				        		placeholder="Enter your password" 
				        		error={!!errors.password&&touched.password}
								helperText={touched.password?errors.password:''}
				        		className={classes.textf}
				        		onChange={handleChange}
				        		onBlur={handleBlur}
				        		InputProps={{
						          endAdornment: (
						            <InputAdornment position="end">
						            	<IconButton
						                  aria-label="toggle password visibility"
						                  onClick={togglePassword}
						                >
						              	{showPassword ? <Visibility /> : <VisibilityOff />}
						              	</IconButton>
						            </InputAdornment>
						          ),
						        }}
				        	/> <br/>
				        	<Button 
				        		type="submit" 
				        		disabled={isSubmitting}
				        		variant="contained" 
				        		color="primary" 
				        		className={classes.textf}
				        	> 
				        		Log In 
				        	</Button>
			        	</Form>
			        	</Box>
			        	)}
			        </Formik>
			      </TabPanel>
			      <TabPanel value={value} index={1}>
			      <Formik 
			      	initialValues={{
			      		name:'',
			      		age:'',
			      		contact_n:'',
			      		fname:'' ,
			      		lname:'', 
			      		username:'',
			      		password:'',
			      		password_confirm:'',
			      		loginAs:'Student',
			      		institute:'',
			      	}}
			      	validate={values => {
			      	const errors = {};
				        if (!values.username) {
				          errors.username = 'Required';
				        } else if (
				          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
				        ) {
				          errors.username = 'Invalid email address';
				        }
				        if(!values.fname && values.loginAs!=="Institute"){
				        	errors.fname = "Fill this field"
				        }
				        if(!values.lname && values.loginAs!=="Institute"){
				        	errors.lname = "Fill this field"
				        }
				        if (!values.password){
				        	errors.password = 'Fill this field';
				        }
				        else if (values.password.length<8){
				        	errors.password = 'Password is too Short'
				        }
				        else if(values.password!==values.password_confirm && values.password_confirm!==''){
				        	errors.password = 'Password not matching';
				        }
				        else if (!values.name && values.loginAs==="Institute"){
				        	errors.name = "Fill this field"
				        }
				        if((values.contact_n).toString().length!==10){
				        	errors.contact_n = "Invalid Number"
				        }
				        if (!values.institute){
				        	errors.institute = "Required"
				        }
				        if (!values.age && values.loginAs!=="Institute"){
				        	errors.age ="Invalid age"
				        }
				        return errors;
				      }}
				      onSubmit={async (values, { setSubmitting }) => {
				        setTimeout(() => {
				          setSubmitting(false);
				        }, 1000);
				        if (values.loginAs!=="Institute"){
							values.name=values.fname+" "+values.lname;
							try{
									let temp = await Axios.post('/api/volunteers/register',{
										name:values.name,
										contact_n:values.contact_n,
										email:values.username,
										password1:values.password,
										institute:values.institute,
										age:values.age
									});
									console.log(temp.data);
							}catch(e){
								console.log(e.response)
							}
						}else{
							try{
								let temp = await Axios.post('/api/NGO/register',{
									name:values.name,
									contact_n:values.contact_n,
									email:values.username,
									password1:values.password,
									address:values.locality,
								});
								console.log(temp);
						}catch(e){
							console.log(e)
						}
						}
				        console.log(values);
				    }}
			      >
			      {({ isSubmitting ,handleChange,handleBlur,values,errors,touched}) => (
			      	<Form autoComplete="off">
				      <Grid container spacing={2}>
				      	{values.loginAs!=="Institute"?
				      	<React.Fragment>
				      	<Grid item xs={6}>
					      		<TextField 
					      			name="fname" 
					        		error={!!errors.fname&&touched.fname}
									helperText={touched.fname?errors.fname:''}
								 	label="First Name" 
								 	onChange={handleChange} 
								 	onBlur={handleBlur} 
							 		fullWidth
							 /> 
					      	</Grid>
				      		<Grid item xs={6}>
								<TextField 
									name="lname"  
									label="Last Name" 
									onChange={handleChange} 
									onBlur={handleBlur} 
									fullWidth
									error={!!errors.lname&&touched.lname}
									helperText={touched.lname?errors.lname:''}
								/>
							</Grid>
						</React.Fragment>
							:	
							<TextField 
							name="name"							
							fullWidth
							label="Institute Name" 
							className={classes.textf}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
						/> 
						}
						</Grid>	
						<TextField 
							name="username"
							type="email" 
							fullWidth
							label="Email" 
							placeholder="example@domain.com" 
			        		error={!!errors.username&&touched.username}
							helperText={touched.username?errors.username:''}
							className={classes.textf}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
						/> 
						<TextField 
							name="contact_n"
							type="number" 
							label="Contact Number" 
							fullWidth
							placeholder="Contact Number" 
			        		error={!!errors.contact_n&&touched.contact_n}
							helperText={touched.contact_n?errors.contact_n:''}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<br/>
						<TextField 
							name="password"
							type="password" 
							label="Password" 
							fullWidth
							variant="outlined" 
							placeholder="Enter your password"
			        		error={!!errors.password&&touched.password}
							helperText={touched.password?errors.password:"Minimum 8 charecters"}
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<TextField 
							name="password_confirm"
							type="password" 
							 
							label="Confirm Password" 
							fullWidth
							variant="outlined" 
							placeholder="Re-Enter your password" 
			        		onChange={handleChange}
			        		onBlur={handleBlur}
							className={classes.textf}
						/> 
						<br/>
						<Grid container className={classes.textf}>
						<Grid item xs={4}>
						<Typography>Join as: </Typography>
						</Grid>
						<Grid item xs={8}>
						<TextField 
							select 
							value={values.loginAs} 
							 
							name="loginAs" 
			        		error={!!errors.loginAs&&touched.loginAs}
							helperText={touched.loginAs?errors.loginAs:''}
							onChange={handleChange} 
							onBlur={handleBlur} 
							fullWidth
						>
							<MenuItem value="Student">Student</MenuItem>
							<MenuItem value="Teacher">Teacher</MenuItem>
							<MenuItem value="Institute">Institute</MenuItem>
						</TextField><br/>
						</Grid>
						<Grid container className={classes.textf}>
						<Grid item xs={4}>
						<Typography>Institute: </Typography>
						</Grid>
						<Grid item xs={8}>
						<TextField 
							name="institute"
							placeholder="Institute Name"
							value={values.locality} 
							 
							onChange={handleChange} 
							onBlur={handleBlur}
			        		error={!!errors.institute&&touched.institute}
							helperText={touched.institute?errors.institute:''}
							fullWidth
						/><br/>
							</Grid>
						</Grid>
						{values.loginAs!=="Institute"?
						<React.Fragment>
						<Grid container className={classes.textf}>
						
						<Grid item xs={4}>
						<Typography>Age: </Typography>
						</Grid>
						<Grid item xs={8}>
						<TextField 
							value={values.age} 
							name="age" 
							type="number"
			        		error={!!errors.age&&touched.age}
							helperText={touched.age?errors.age:''}
							onChange={handleChange} 
							onBlur={handleBlur}
						/><br/>
							</Grid>
						</Grid>
						</React.Fragment>
						:
						<React.Fragment>
						</React.Fragment>
					}
						</Grid>
					<Button type="submit" disabled={isSubmitting} className={classes.textf} variant="contained" color="primary">Sign Up</Button>
					</Form>
					)}
			        </Formik>
		      	</TabPanel>
		    </div>
    	</div>
    );
}

