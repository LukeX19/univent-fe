import { React, useState } from "react";
import { Grid, Typography, Box, Button, Avatar, Badge, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { register } from "../../../api/index";
import './signup.css'

const StepThree = ({formData, setFormData, handleBack}) => {
    const navigate = useNavigate();

    const uploadImage = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function () {
            var base64String = reader.result;

            setFormData({...formData, avatar: base64String});
     
            console.log(base64String);
        }

        reader.readAsDataURL(file);
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [warningAlertOpen, setWarningAlertOpen] = useState(false);
    const submit = () => {
        register({
            username: formData.email,
            password: formData.password,
            universityID: formData.university,
            year: formData.year,
            firstName: formData.firstname,
            lastName: formData.lastname,
            phoneNumber: formData.phoneNumber,
            dateOfBirth: format(new Date(formData.dateOfBirth), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
            hometown: formData.hometown,
            profilePicture: formData.avatar
        }).then(function (response) {
            setWarningAlertOpen(true);
        })
        .catch(function (error) {
            (error.response.status === 409)? setErrorMessage(`A user account with email "${formData.email}" already exists`) : alert("An error occured on server. Please try again later.");
            console.log(error);
        })
    };

    return(
        <>
        <Grid container>
            <Grid item xs={12} py={1}>
                <Typography fontSize="16px">You can either upload a profile picture now or choose to skip this step and set it up at a later time.</Typography>
            </Grid>
            <Grid item xs={12} mt={2} mb={8} className="grid-avatar">
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
            {errorMessage &&
                <Grid item xs={12} pb={4}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Grid>
            }
            <Grid item xs={6}>
                <Box xs={6} className="prev">
                    <Button className="prev-button" variant="contained" onClick={handleBack}>Back</Button>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box xs={6} className="next">
                    <Button className="next-button" variant="contained" onClick={() => {submit()}}>Submit</Button>
                </Box>
            </Grid>
        </Grid>
        <Dialog open={warningAlertOpen}>
            <DialogTitle>Important Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your request for an account on Univent platform has been successfully sent!
                    <br/>
                    You will be granted access by the administrator in maximum 24 hours.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: "15px"}}>
                <Button sx={{background: "#18BF89", color: "#FBFBFB", "&:hover": {background: "#FFB84C"}}} onClick={() => {navigate("/");}}>I Understand</Button>
                {/* <Button sx={{"&:hover": {color: "#FBFBFB", background: "#18BF89"}}} variant="outlined">I Understand</Button> */}
            </DialogActions>
        </Dialog>
        </>
    )
}

export default StepThree;