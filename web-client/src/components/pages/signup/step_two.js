import { React, useState } from 'react';
import { Grid, TextField, Box, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './signup.css';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import YupPassword from 'yup-password';
YupPassword(yup)

const StepTwo = ({formData, handleChange, handleNext, handleBack}) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const schema = yup.object().shape({
        email: yup.string().email("Please use a valid email address"),
        password: yup.string().password(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords don't match. Try again.")
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => {
        handleNext();
    }

    const checkPassword = () => {
        return {
            length: formData.password.length >= 8,
            lowercase: /[a-z]/.test(formData.password),
            uppercase: /[A-Z]/.test(formData.password),
            digit: /[0-9]/.test(formData.password),
            specialChar: /[.!?-]/.test(formData.password)
        };
    };

    const requirements = checkPassword();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Grid item xs={12} py={1}>
                    <TextField {...register("email")} required value={formData.email} onChange={handleChange} type="text" label="E-mail" variant="outlined" fullWidth/>
                    <Typography className="error">{errors.email?.message}</Typography>
                </Grid>
                <Grid item xs={12} py={1}>
                    <TextField {...register("password")} required value={formData.password} onChange={handleChange} label="Password" variant="outlined" fullWidth
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                </Grid>
                <Grid item xs={12} py={1}>
                    <TextField {...register("confirmPassword")} required value={formData.confirmPassword} onChange={handleChange} label="Confirm password" variant="outlined" fullWidth
                        type={showConfirmPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />
                    <Typography className="error">{errors.confirmPassword?.message}</Typography>
                </Grid>
                <Grid item xs={12} pb={3}>
                    <div className="password-requirements">
                        <p>Password must have at least: </p>
                        <ul>
                            <li style={{color: requirements.length ? "green" : "#191919"}}>8 characters</li>
                            <li style={{color: requirements.lowercase ? "green" : "#191919"}}>one lowercase character</li>
                            <li style={{color: requirements.uppercase ? "green" : "#191919"}}>one uppercase character</li>
                            <li style={{color: requirements.digit ? "green" : "#191919"}}>one digit</li>
                            <li style={{color: requirements.specialChar ? "green" : "#191919"}}>one special character .!?-</li>
                        </ul>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Box xs={6} className="prev">
                        <Button className="prev-button" variant="contained" onClick={handleBack}>Back</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box xs={6} className="next">
                        <Button type="submit" className="next-button" variant="contained">Next Step</Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default StepTwo;