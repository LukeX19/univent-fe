import { React, useState } from 'react';
import { Grid, Typography, TextField, Button, IconButton, InputAdornment, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from "../../../api/index";
import jwt_decode from "jwt-decode";
import '../signin/signin.css';

const initialState = {email: "", password: ""};

const Signin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const schema = yup.object().shape({
        email: yup.string().email("Please use a valid email address"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => {
        login({
            username: formData.email,
            password: formData.password
        }).then(function (response) {
            localStorage.setItem("token", response.data.token);
            const decoded_token = jwt_decode(response.data.token);
            if(decoded_token.Role === "Admin")
            {
                navigate("/admin");
            }
            else
            {
                navigate("/feed");
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="container-signin">
                <Paper elevation={20} className="paper">
                    <Grid container className="container">
                        <Grid item xs={12} pb={5} textAlign="center">
                            <Typography fontSize="30px">Good to see you again!</Typography>
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <TextField {...register("email")} required value={formData.email} onChange={handleChange} type="text" label="E-mail" variant="outlined" fullWidth/>
                            <Typography className="error">{errors.email?.message}</Typography>
                        </Grid>
                        <Grid item xs={12} py={1} pb={4}>
                            <TextField {...register("password")} required value={formData.password} onChange={handleChange} label="Password" variant="outlined" fullWidth
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className="forgot-password-link">Forgot password</Typography>
                        </Grid>
                        <Grid item xs={12} py={1} className="signup-section">
                            <Typography>New to our platform? Create an account</Typography>
                            <Typography className="signup-link" onClick={() => {navigate("/signup")}}>here</Typography>
                        </Grid>
                        <Grid item xs={12} py={2} className="button-container"> 
                            <Button variant="contained" type="submit" className="signin-button">LOGIN</Button>
                        </Grid>
                        {/*
                        <Grid item xs={12} textAlign="center"> 
                            <Typography>- OR -</Typography>
                        </Grid>
                        <Grid item xs={12} py={1} className="button-container"> 
                            <Button variant="contained" className="google-button"><GoogleIcon className="icon"/>Sign in with Google</Button>
                        </Grid>
                        <Grid item xs={12} py={1} className="button-container"> 
                            <Button variant="contained" className="facebook-button"><FacebookIcon className="icon"/>Sign in with Facebook</Button>
                        </Grid>
                        */}
                    </Grid>
                </Paper>
            </Grid>
        </form>
    )
}

export default Signin;