import { React, useEffect } from "react";
import "../event_card/event_card.css";
import { Avatar, Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import cooking from "../images/cooking.png";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getEventTypeAction } from "../../actions/eventTypes";
import { getUserProfileAction } from "../../actions/userProfiles";

const EventCard = ({ev}) => {
    const formattedStartTime = format(new Date(ev.startTime), 'dd.MM.yyyy \'at\' HH:mm');

    const dispatch = useDispatch();
    //const eventTypeFromDB = useSelector(state => state.eventTypes);
    const userProfileFromDB = useSelector(state => state.userProfiles);

    useEffect(() => {
        dispatch(getEventTypeAction(ev.eventTypeID));
        dispatch(getUserProfileAction(ev.userProfileID))
    }, [dispatch]);

    console.log(eventTypeFromDB);
    console.log(userProfileFromDB);

    return(
        <Grid container className="container-event-card">
            <Paper elevation={10} className="paper">
                <Grid container>
                    <Grid item xs={12} md={4} className="grid-image">
                        <img src={cooking} width="100%" height="100%"/>
                        <Box className="box">
                            <Typography pl={2} py={2} className="placeholder">{eventTypeFromDB.name}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={7} py={2} textAlign="center">
                                <Typography variant="h5">{ev.name}</Typography>
                                <Typography>7/{ev.maximumParticipants} Participants Joined</Typography>
                            </Grid>
                            <Grid item xs={12} md={5} py={3} textAlign="center">
                                <Typography>{formattedStartTime}</Typography>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={7} px={3}>
                                <Grid container>
                                    <Grid item xs={12} py={1}>
                                        <Typography>Created by</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Avatar alt="avatar" src={ev.image}>{ev.author_lastname.charAt(0)}{ev.author_firstname.charAt(0)}</Avatar>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{ev.author_lastname} {ev.author_firstname}</Typography>
                                        <Rating readOnly precision={0.5} value={ev.rating}/>
                                    </Grid>
                                </Grid>
                            </Grid> */}
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