import { React, useState, useEffect } from "react";
import "../event_card/event_card.css";
import { Avatar, Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import cooking from "../images/cooking.png";
import { getEventTypeById, getUserProfileById } from "../../api";
import { format } from "date-fns";

const EventCard = ({event}) => {
    const formattedStartTime = format(new Date(event.startTime), 'dd.MM.yyyy \'at\' HH:mm');

    const [eventType, setEventType] = useState('');
    useEffect(() => {
        getEventTypeById(event.eventTypeID).then(function (response) {
            setEventType(response.data.name);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const [userAuthor, setUserAuthor] = useState({});
    useEffect(() => {
        getUserProfileById(event.userProfileID).then(function (response) {
            setUserAuthor(response.data.basicInfo);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return(
        <Grid container className="container-event-card">
            <Paper elevation={10} className="paper">
                <Grid container>
                    <Grid item xs={12} md={4} className="grid-image">
                        <img src={cooking} width="100%" height="100%"/>
                        <Box className="box">
                            <Typography pl={2} py={2} className="placeholder">{eventType}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={7} py={2} textAlign="center">
                                <Typography variant="h5">{event.name}</Typography>
                                <Typography>7/{event.maximumParticipants} Participants Joined</Typography>
                            </Grid>
                            <Grid item xs={12} md={5} py={3} textAlign="center">
                                <Typography>{formattedStartTime}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} px={3}>
                                <Grid container>
                                    <Grid item xs={12} py={1}>
                                        <Typography>Created by</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        {
                                            userAuthor.profilePicture !== "" ?
                                            (
                                                <Avatar src={userAuthor.profilePicture}/>
                                            )
                                            :
                                            (
                                                <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}}>
                                                    {userAuthor.lastName.charAt(0)}
                                                    {userAuthor.firstName.charAt(0)}
                                                </Avatar>
                                            )
                                        }
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{userAuthor.lastName} {userAuthor.firstName}</Typography>
                                        <Rating readOnly precision={0.5} value={4}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} px={{xs: 5, sm: 3, md: 2}} py={{xs: 4, sm: 4, md: 0}} className="grid-button" >
                                <Button variant="contained">Check more Details</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default EventCard;