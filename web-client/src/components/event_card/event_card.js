import { React } from "react";
import "../event_card/event_card.css";
import { Avatar, Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import cooking from "../images/cooking.png";

const EventCard = ({event}) => {
    return(
        <Grid container className="container-event-card">
            <Paper elevation={10} className="paper">
                <Grid container>
                    <Grid item xs={12} md={4} className="grid-image">
                        <img src={cooking} width="100%" height="100%"/>
                        <Box className="box">
                            <Typography pl={2} py={2} className="placeholder">Cooking</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={7} py={2} textAlign="center">
                                <Typography variant="h5">{event.title}</Typography>
                                <Typography>{event.enrolled_participants}/{event.total_participants} Participants Joined</Typography>
                            </Grid>
                            <Grid item xs={12} md={5} py={3} textAlign="center">
                                <Typography>{event.date} at {event.time}</Typography>
                                <Typography>{event.address}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} px={3}>
                                <Grid container>
                                    <Grid item xs={12} py={1}>
                                        <Typography>Created by</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Avatar alt="avatar" src={event.image}>{event.author_lastname.charAt(0)}{event.author_firstname.charAt(0)}</Avatar>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>{event.author_lastname} {event.author_firstname}</Typography>
                                        <Rating readOnly precision={0.5} value={event.rating}/>
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