import { React, useState } from 'react';
import { Grid, Typography, Stepper, Step, StepLabel, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StepOne from './step_one.js';
import StepTwo from './step_two.js';
import StepThree from './step_three.js';
import '../signup/signup.css';

const initialState = {firstname: "", lastname: "", university: "", year: "", phoneNumber: "", dateOfBirth: null, hometown: "", email: "", password: "", confirmPassword: "", avatar: ""};

const Signup = () => {

    const [step, setStep] = useState(0);

    const [formData, setFormData] = useState(initialState);

    const steps = [
        <PersonIcon className="icon-step"/>,
        <LockIcon className="icon-step"/>,
        <AddAPhotoIcon className="icon-step"/>
    ];

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleForm = () => {
        switch(step){
            case 0:
                return <StepOne formData={formData} setFormData={setFormData} handleChange={handleChange} handleNext={handleNext}/>;
            case 1:
                return <StepTwo formData={formData} handleChange={handleChange} handleNext={handleNext} handleBack={handleBack}/>;
            case 2:
                return <StepThree formData={formData} setFormData={setFormData} handleBack={handleBack}/>;
        }
    };

    return(
        <Grid container className="container-signup">
            <Paper elevation={20}>
                <Grid item xs={12} px={10} className="custom-grid">
                    <Grid container className="form">
                        <Grid item xs={12} className="title">
                            <Typography fontSize="25px">Sign Up</Typography>
                        </Grid>
                        <Grid item xs={12} py={4}>
                            <Stepper activeStep={step} alternativeLabel>
                                {steps.map((label, index) => (
                                    <Step key={index}
                                        sx={{
                                            '& .MuiStepLabel-root .Mui-completed': {
                                                color: '#18BF89', 
                                            },
                                            '& .MuiStepLabel-root .Mui-active': {
                                                color: '#FDD365', 
                                            },
                                            '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                                fill: '#191919', 
                                            },
                                        }}
                                    >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                        <Grid item xs={12}>
                            {handleForm()}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Signup;