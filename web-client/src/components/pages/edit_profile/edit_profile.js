import { React, useState } from 'react';
import { Box, Button, Grid, Paper, Typography, TextField, Avatar, Autocomplete, Badge, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavbarLoggedIn from '../../navbar_logged/navbar_logged.js';
import '../edit_profile/edit_profile.css';

const initialState = {firstname: "Andreea", lastname: "Oprea", university: "West University Timișoara", year: 3, phoneNumber: "0745932817", email: "a@gmail.com", avatar:''};

const EditProfile = () => {

    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const schema = yup.object().shape({
        firstname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        lastname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        phoneNumber: yup.string().matches(/^\+?\d{10,14}$/, "Invalid phone number format"),
        email: yup.string().email("Please use a valid email address"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const uploadImage = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function () {
            var base64String = reader.result;

            setFormData({...formData, avatar: base64String});
     
            console.log(base64String);
        }

        reader.readAsDataURL(file);
    }

    const onSubmit = () => {
        console.log(formData);
    }

    const universities = ["The Polytehnic University Timișoara", "West University Timișoara", "Victor Babes University of Medicine and Pharmacy Timișoara", "University of life sciences 'KING MIHAI I' Timișoara"];
    const years = [ 
        {value: 1, option: "I"}, 
        {value: 2, option: "II"},
        {value: 3, option: "III"}, 
        {value: 4, option: "IV"}, 
        {value: 5, option: "V"}, 
        {value: 6, option: "VI"}, 
        {value: 7, option: "I Master"}, 
        {value: 8, option: "II Master"} 
    ];

    return(
        <>
        <NavbarLoggedIn/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="container-edit-profile">
                <Paper elevation={3} className="paper">
                    <Grid container>
                        <Grid item xs={12} className="title">
                            <Typography variant="h5">Edit profile</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} className="grid-avatar">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                badgeContent={
                                    formData.avatar? 
                                    (
                                        <DeleteForeverIcon className="delete-icon" onClick={() => {setFormData({...formData, avatar: ""})}}/>
                                    )
                                    :
                                    (
                                        <label htmlFor="avatar"> 
                                            <AddIcon className="add-icon"/>
                                        </label>
                                    )
                                }
                            >
                                <Avatar alt="avatar" key={formData.avatar} className="avatar" src={formData.avatar} mt={3} mb={2}><InsertPhotoIcon sx={{fontSize: "4rem", color: "#EFF5F5"}}/></Avatar>
                            </Badge>

                            <input type="file" id="avatar" accept=".jpg, .jpeg, .png" style={{display : "none"}} onChange={(event) => {uploadImage(event)}}/>
                        </Grid>
                        <Grid item md={6}>
                            <Grid container>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("firstname")} required value={formData.firstname} onChange={handleChange} name="firstname" type="text" label="First Name" variant="outlined" fullWidth/>
                                    <Typography className="error">{errors.firstname?.message}</Typography>
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("lastname")} required value={formData.lastname} onChange={handleChange} name="lastname" type="text" label="Last Name" variant="outlined" fullWidth/>
                                    <Typography className="error">{errors.lastname?.message}</Typography>
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <Autocomplete
                                        disableClearable
                                        options={["", ...universities]}
                                        value={formData.university}
                                        onChange={(event, value) => {setFormData({...formData, university: value})}}
                                        renderInput={(params) => (
                                            <TextField {...params} required label="University" variant="outlined" />
                                        )}
                                        renderOption={(props, option) => {
                                            if (option === "") 
                                            {
                                                return <li {...props}><em>None</em></li>;
                                            } 
                                            else 
                                            {
                                                return <li {...props}>{option}</li>;
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="select">Year</InputLabel>
                                        <Select
                                            labelId="select"
                                            value={formData.year}
                                            label="Year"
                                            name="year"
                                            required
                                            onChange={handleChange}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {years.map((year, index) => {
                                                return(
                                                    <MenuItem value={year.value} key={index}>{year.option}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("phoneNumber")} required value={formData.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" label="Phone number" variant="outlined" fullWidth/>
                                    <Typography className="error">{errors.phoneNumber?.message}</Typography>
                                </Grid>
                                <Grid item xs={12} py={1}>
                                    <TextField {...register("email")} required value={formData.email} onChange={handleChange} name="email" type="text" label="Email" variant="outlined" fullWidth/>
                                    <Typography className="error">{errors.email?.message}</Typography>
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
        </>
    )
}

export default EditProfile;