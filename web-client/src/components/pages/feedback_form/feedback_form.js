import { React } from 'react';
import { Box, Button, Grid, Paper, Typography, Avatar, Rating } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NavbarLoggedIn from '../../navbar_logged/navbar_logged.js';
import '../feedback_form/feedback_form.css';

const FeedbackForm = () => {

    const participants = [
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
        }, 
    ];
    
    return(
        <>
        <NavbarLoggedIn/>
        <Grid container className="container-feedback-form">
            <Paper elevation={0} className="paper">
                <Grid container pb={2}>
                    <Grid item xs={12} py={2} className="grid">
                        <Typography variant="h5">Feedback Form for Event</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <Typography variant="h6">'Taste - Tastic' I can cook</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <CalendarMonthIcon className="icon"/><Typography variant="h6" px={1}>28 Oct. 2023</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <AccessTimeIcon className="icon"/><Typography variant="h6" px={1}>18:00</Typography>
                    </Grid> 
                </Grid>
                <div className="container">
                    {participants.map((participant, index) => {
                        return(
                            <Grid container py={2} alignItems={"center"} key={index}>
                                <Grid item xs={2} className="grid">
                                    <Avatar alt="avatar" src={participant.image} className="img">{participant.lastname.charAt(0)}{participant.firstname.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item xs={6} pr={4} className="grid">
                                    <Typography variant="h6">{participant.lastname} {participant.firstname}</Typography>
                                </Grid>
                                <Grid item xs={4} className="grid" pr={4}>
                                    <Rating sx={{fontSize: '2rem'}} precision={0.5}/>
                                </Grid>
                            </Grid>
                        )
                    })}
                </div>
                <Grid item xs={12} py={1}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained">SEND</Button>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
        </>
    )
}

export default FeedbackForm;