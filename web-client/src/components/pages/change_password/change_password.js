import { React, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Paper, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { changePassword } from "../../../api/index.js";
import "../change_password/change_password.css";
YupPassword(yup)

const initialState = {oldPassword: "", newPassword: "", confirmPassword: ""};

const ChangePassword = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const [showOldPassword, setShowOldPassword] = useState(false);
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const schema = yup.object().shape({
        newPassword: yup.string().password(),
        confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords don't match. Try again.")
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const checkPassword = () => {
        return {
            length: formData.newPassword.length >= 8,
            lowercase: /[a-z]/.test(formData.newPassword),
            uppercase: /[A-Z]/.test(formData.newPassword),
            digit: /[0-9]/.test(formData.newPassword),
            specialChar: /[.!?-]/.test(formData.newPassword)
        };
    };

    const requirements = checkPassword();

    const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);
    const handleConfirmAlertOpen = () => {
        setConfirmAlertOpen(true);
    };
    const handleConfirmAlertClose = () => {
        setConfirmAlertOpen(false);
    };

    const onSubmit = () => {
        handleConfirmAlertOpen();
    };

    const sendRequest = () => {
        changePassword({
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword
        }).then(function (response) {
            navigate("/profile");
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    
    return(
        <>
        <NavbarLoggedIn/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="container-change-password">
                <Paper elevation={3} className="paper">
                    <Grid container>
                        <Grid item xs={12} className="title">
                            <Typography variant="h5">Change password</Typography>
                        </Grid>
                        <Grid item md={12} py={3}>
                            <Grid container>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("oldPassword")} required value={formData.oldPassword} onChange={handleChange} name="oldPassword" label="Old Password" variant="outlined" fullWidth
                                        type={showOldPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">
                                                <IconButton onClick={handleClickShowOldPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                    {showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("newPassword")} required value={formData.newPassword} onChange={handleChange} name="newPassword" label="Password" variant="outlined" fullWidth
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
                                    <TextField {...register("confirmPassword")} required value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" label="Confirm password" variant="outlined" fullWidth
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
                                            <li style={{color: requirements.length ? "green" : "black"}}>8 characters</li>
                                            <li style={{color: requirements.lowercase ? "green" : "black"}}>one lowercase character</li>
                                            <li style={{color: requirements.uppercase ? "green" : "black"}}>one uppercase character</li>
                                            <li style={{color: requirements.digit ? "green" : "black"}}>one digit</li>
                                            <li style={{color: requirements.specialChar ? "green" : "black"}}>one special character .!?-</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button type="submit" variant="contained">SAVE CHANGES</Button>
                            </Box>
                        </Grid>
                    </Grid> 
                </Paper>
            </Grid>
        </form>
        <Dialog open={confirmAlertOpen} onClose={handleConfirmAlertClose}>
            <DialogTitle>{"Confirm Changes"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to save these changes?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: "15px"}}>
                <Button sx={{background: "green", color: "#FBFBFB", "&:hover": {background: "#FFB84C"}}} onClick={sendRequest}>Confirm</Button>
                <Button onClick={handleConfirmAlertClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ChangePassword;