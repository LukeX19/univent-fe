import { React, useEffect } from 'react';
import { Grid, Typography, TextField, Box, Autocomplete, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getAllUniversitiesAction } from '../../../actions/universities';
import { useDispatch, useSelector } from 'react-redux';
import './signup.css';

const StepOne = ({formData, setFormData, handleChange, handleNext}) => {
    const dispatch = useDispatch();
    const universitiesFromDB = useSelector(state => state.universities);

    useEffect(() => {
        dispatch(getAllUniversitiesAction())
    }, [dispatch]);

    console.log(universitiesFromDB);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        lastname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        phoneNumber: yup.string().matches(/^\+?\d{10,14}$/, "Invalid phone number format"),
        hometown: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters")
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = () => {
        handleNext();
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
                <Grid item xs={12} py={1}>
                    <TextField {...register("firstname")} required value={formData.firstname} onChange={handleChange} type="text" label="First Name" variant="outlined" fullWidth/>
                    <Typography className="error">{errors.firstname?.message}</Typography>
                </Grid>
                <Grid item xs={12} py={1}>
                    <TextField {...register("lastname")} required value={formData.lastname} onChange={handleChange} type="text" label="Last Name" variant="outlined" fullWidth/>
                    <Typography className="error">{errors.lastname?.message}</Typography>
                </Grid>
                <Grid item xs={8} py={1} pr={1}>
                    {/* <Autocomplete
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
                    /> */}
                    <FormControl fullWidth>
                        <InputLabel id="selectUniversity">University *</InputLabel>
                        <Select
                            labelId="selectUniversity"
                            value={formData.university}
                            label="University *"
                            name="university"
                            required
                            onChange={handleChange}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {universitiesFromDB.map((university, index) => {
                                return(
                                    <MenuItem value={university.universityID} key={index}>{university.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4} py={1}>
                    <FormControl fullWidth>
                        <InputLabel id="select">Year *</InputLabel>
                        <Select
                            labelId="select"
                            value={formData.year}
                            label="Year *"
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
                    <TextField {...register("phoneNumber")} required value={formData.phoneNumber} onChange={handleChange} type="text" label="Phone number" variant="outlined" fullWidth/>
                    <Typography className="error">{errors.phoneNumber?.message}</Typography>
                </Grid>
                <Grid item xs={12} py={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                         <DateField
                            required
                            label="Date of birth"
                            value={formData.dateOfBirth}
                            onChange={(newValue) => {setFormData({...formData, dateOfBirth: newValue})}}
                            format="DD-MM-YYYY"
                            sx={{width: '100%'}}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} py={1}>
                    <TextField {...register("hometown")} required value={formData.hometown} onChange={handleChange} type="text" label="Hometown" variant="outlined" fullWidth/>
                    <Typography className="error">{errors.hometown?.message}</Typography>
                </Grid>
                <Grid item xs={12} py={2} className="signin-section">
                    <Typography fontSize="14px">Already have an account?</Typography>
                    <Typography className="signin-link" onClick={() => {navigate("/signin")}}>Sign In</Typography>
                </Grid>
                <Grid item xs={12} py={1}>
                    <Box className="next">
                        <Button type="submit" className="next-button" variant="contained">Next Step</Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default StepOne;