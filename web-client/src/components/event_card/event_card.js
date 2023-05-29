import { React, useState, useEffect } from "react";
import "../event_card/event_card.css";
import { Avatar, Box, Button, Grid, Paper, Rating, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { getEventTypeById, getUserProfileById, getParticipantsByEventId, getAverageRatingById } from "../../api";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const formattedStartTime = format(new Date(event.startTime), "dd.MM.yyyy 'at' HH:mm");
  
    const [eventType, setEventType] = useState("");
    const [eventTypeLoading, setEventTypeLoading] = useState(true);
    const [eventTypePicture, setEventTypePicture] = useState(null);
    useEffect(() => {
      getEventTypeById(event.eventTypeID)
        .then(async function (response) {
          setEventType(response.data);
          setEventTypeLoading(false);
          const picture = await import("../../images/" + response.data.picture);
          setEventTypePicture(picture.default);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [event.eventTypeID]);
  
    const [userAuthor, setUserAuthor] = useState({});
    const [userAuthorLoading, setUserAuthorLoading] = useState(true);
    const [ratingInfo, setRatingInfo] = useState({ value: 0 });
    useEffect(() => {
      getUserProfileById(event.userProfileID)
        .then(function (response) {
          setUserAuthor(response.data.basicInfo);
          setUserAuthorLoading(false);

          return getAverageRatingById(event.userProfileID)
        })
        .then(function (ratingResponse) {
            setRatingInfo(ratingResponse.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [event.userProfileID]);

    const [participantsNumber, setParticipantsNumber] = useState(0);
    useEffect(() => {
        getParticipantsByEventId(event.eventID)
          .then(function (response) {
            setParticipantsNumber(response.data.length);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);
  
    return (
        <Grid container className="container-event-card">
            <Paper elevation={10} className="paper">
                <Grid container>
                    <Grid item xs={12} md={4} className="grid-image">
                        <img src={eventTypePicture} width="100%" height="100%"/>
                        <Box className="box">
                            { eventTypeLoading ?
                                (
                                    <Typography pl={2} py={2} className="placeholder">
                                        Loading...
                                    </Typography>
                                )
                                :
                                (
                                    <Typography pl={2} py={2} className="placeholder">
                                        {eventType.name}
                                    </Typography>
                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={7} py={2} textAlign="center">
                                <Typography variant="h5">{event.name}</Typography>
                                <Typography>{participantsNumber}/{event.maximumParticipants} Participants Joined</Typography>
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
                                        { userAuthor.profilePicture !== "" ?
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
                                        <Rating readOnly precision={0.1} value={ratingInfo.value}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} px={{xs: 5, sm: 3, md: 2}} py={{xs: 4, sm: 4, md: 0}} className="grid-button" >
                                <Button variant="contained" onClick={() => {navigate(`/event/${event.eventID}`)}}>Check more Details</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default EventCard;