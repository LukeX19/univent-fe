import { React, useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Paper, Typography, TextField, Avatar, Badge, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { format, parse, differenceInYears } from "date-fns";
import jwt_decode from "jwt-decode";
import { getAllUniversities, getUserProfileById, updateUserProfile } from "../../../api/index.js";
import "../edit_profile/edit_profile.css";

const initialState = {firstname: "", lastname: "", university: "", year: 1, phoneNumber: "", email: "", dateOfBirth: null, hometown: "", avatar: ''};

const EditProfile = () => {
    const navigate = useNavigate();

    const [universitiesInfo, setUniversities] = useState([]);
    useEffect(() => {
        getAllUniversities().then(function (response) {
            setUniversities(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const decoded_token = jwt_decode(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        getUserProfileById(decoded_token.UserProfileId).then(function (response) {
            setUserInfo(response.data.basicInfo);
            setFormData({
                firstname: response.data.basicInfo.firstName,
                lastname: response.data.basicInfo.lastName,
                university: response.data.universityID,
                year: response.data.year,
                phoneNumber: response.data.basicInfo.phoneNumber,
                email: response.data.basicInfo.emailAddress,
                dateOfBirth: response.data.basicInfo.dateOfBirth,
                hometown: response.data.basicInfo.hometown,
                avatar: response.data.basicInfo.profilePicture
            });
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const schema = yup.object().shape({
        firstname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        lastname: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters"),
        phoneNumber: yup.string().matches(/^\+?\d{10,14}$/, "Invalid phone number format"),
        email: yup.string().email("Please use a valid email address"),
        dateOfBirth: yup.string()
                        .test("dateOfBirth", "Age should be between 18 and 26", function (value) {
                            const parsedDate = parse(value, 'dd-MM-yyyy', new Date());
                            return differenceInYears(new Date(), parsedDate) >= 18 && differenceInYears(new Date(), parsedDate) <= 26;
                        }),
        hometown: yup.string().matches(/[a-zA-ZăâîșțĂÂÎȘȚ -]+$/, "Must be only letters")
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
        }

        reader.readAsDataURL(file);
    };

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
        updateUserProfile(decoded_token.UserProfileId,
            {
                universityID: formData.university,
                year: formData.year,
                firstName: formData.firstname,
                lastName: formData.lastname,
                emailAddress: formData.email,
                phoneNumber: formData.phoneNumber,
                dateOfBirth: format(new Date(formData.dateOfBirth), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
                hometown: formData.hometown,
                profilePicture: formData.avatar
            }).then(function (response) {
                console.log(response.status);
                navigate("/profile");
            }).catch(function (error) {
                console.log(error);
        })
    };

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
            { userInfo.firstName && userInfo.lastName && userInfo.phoneNumber && userInfo.emailAddress && userInfo.dateOfBirth && userInfo.hometown && (
                <Grid container className="container-edit-profile">
                    <Paper elevation={3} className="paper">
                        <Grid container>
                            <Grid item xs={12} className="title">
                                <Typography variant="h5">Edit Profile</Typography>
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
                                    <Grid item xs={12} md={6} pr={1} py={1}>
                                        <TextField {...register("firstname")} required value={formData.firstname} onChange={handleChange} name="firstname" type="text" label="First Name" variant="outlined" fullWidth/>
                                        <Typography className="error">{errors.firstname?.message}</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} py={1}>
                                        <TextField {...register("lastname")} required value={formData.lastname} onChange={handleChange} name="lastname" type="text" label="Last Name" variant="outlined" fullWidth/>
                                        <Typography className="error">{errors.lastname?.message}</Typography>
                                    </Grid>
                                    <Grid item xs={12} py={1}>
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
                                                {universitiesInfo.map((university, index) => {
                                                    return(
                                                        <MenuItem value={university.universityID} key={index}>{university.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
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
                                    <Grid item xs={12} py={1}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DateField
                                                required
                                                {...register("dateOfBirth")}
                                                label="Date of birth"
                                                value={dayjs(formData.dateOfBirth)}
                                                onChange={(newValue) => {setFormData({...formData, dateOfBirth: newValue})}}
                                                format="DD-MM-YYYY"
                                                sx={{width: '100%'}}
                                            />
                                        </LocalizationProvider>
                                        <Typography className="error">{errors.dateOfBirth?.message}</Typography>
                                    </Grid>
                                    <Grid item xs={12} py={1}>
                                        <TextField {...register("hometown")} required value={formData.hometown} onChange={handleChange} type="text" label="Hometown" variant="outlined" fullWidth/>
                                        <Typography className="error">{errors.hometown?.message}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} py={1}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button type="submit" variant="contained" sx={{background: "#68B984", ":hover" : {background: '#68B984'}}}>SAVE CHANGES</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )}
        </form>
        <Dialog open={confirmAlertOpen} onClose={handleConfirmAlertClose}>
            <DialogTitle>{"Confirm Changes"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to save these changes?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: "15px"}}>
                <Button sx={{background: "#68B984", color: "#FBFBFB", ":hover" : {background: '#68B984'}}} onClick={sendRequest}>Confirm</Button>
                <Button onClick={handleConfirmAlertClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default EditProfile;