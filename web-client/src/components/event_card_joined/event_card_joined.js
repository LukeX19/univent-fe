import { React, useState, useEffect } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Typography } from "@mui/material";
import { getEventTypeById, getParticipantsByEventId, getUserProfileById, deleteEventParticipant, getEventParticipantByBothIds } from "../../api";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import jwt_decode from "jwt-decode";
import "../event_card_joined/event_card_joined.css";

const EventCardJoined = ({ joinedEvent }) => {
    const navigate = useNavigate();
    const decoded_token = jwt_decode(localStorage.getItem("token"));
    
    const formattedStartTime = format(new Date(joinedEvent.startTime), "dd.MM.yyyy 'at' HH:mm");

    const [eventType, setEventType] = useState("");
    const [eventTypeLoading, setEventTypeLoading] = useState(true);
    const [eventTypePicture, setEventTypePicture] = useState(null);
    useEffect(() => {
        getEventTypeById(joinedEvent.eventTypeID)
          .then(async function (response) {
            setEventType(response.data.name);
            setEventTypeLoading(false);
            const picture = await import("../../images/" + response.data.picture);
            setEventTypePicture(picture.default);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [joinedEvent.eventTypeID]);

    const [participantsNumber, setParticipantsNumber] = useState(0);
    useEffect(() => {
        getParticipantsByEventId(joinedEvent.eventID)
          .then(function (response) {
            setParticipantsNumber(response.data.length);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    const [userAuthor, setUserAuthor] = useState({});
    useEffect(() => {
      getUserProfileById(joinedEvent.userProfileID)
        .then(function (response) {
          setUserAuthor(response.data.basicInfo);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [joinedEvent.userProfileID]);

    const [leaveEventAlertOpen, setLeaveEventAlertOpen] = useState(false);
    const handleLeaveEventAlertOpen = () => {
        setLeaveEventAlertOpen(true);
    };
    const handleLeaveEventAlertClose = () => {
        setLeaveEventAlertOpen(false);
    };

    const leaveEvent = (id) => {
        deleteEventParticipant(id)
          .then(function (response) {
            console.log(response.status);
            window.location.reload();
        })
          .catch(function (error) {
            console.log(error);
        });
    };

    const [feedbackAvailable, setFeedbackAvailable] = useState(false);
    useEffect(() => {
        getEventParticipantByBothIds(joinedEvent.eventID, decoded_token.UserProfileId)
          .then(function (response) {
            const hasProvidedFeedback = response.data.hasProvidedFeedback;
            setFeedbackAvailable(!hasProvidedFeedback);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    return(
        <>
        <Grid container pt={3} className="container-card-joined">
            <Grid item xs={12} md={4} className="grid-image">
                <img src={eventTypePicture} width="100%" height="100%"/>
                <Box className="box">
                    { eventTypeLoading ? (
                        <Typography pl={2} py={2} className="placeholder">
                            Loading...
                        </Typography>
                    )
                    :
                    (
                        <Typography pl={2} py={2} className="placeholder">
                            {eventType}
                        </Typography>
                    )}
                </Box>          
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} py={2} textAlign="center">
                        <Typography variant="h5">{joinedEvent.name}</Typography>
                        <Typography>{participantsNumber}/{joinedEvent.maximumParticipants} Participants Joined</Typography>
                    </Grid>
                    { !joinedEvent.isCancelled ? (
                        <Grid item xs={12} md={12} py={2} textAlign="center">
                            <Typography>Starts on {formattedStartTime}</Typography>
                        </Grid>
                        )
                        :
                        (
                            <Grid item xs={12} md={12} py={2} textAlign="center">
                                <Typography><span style={{ color: 'red' }}>Cancelled</span></Typography>
                            </Grid>
                        )
                    }
                    <Grid item xs={12} md={12} textAlign="center">
                        <Typography fontSize="15px">Created by {userAuthor.lastName} {userAuthor.firstName}</Typography>
                    </Grid>
                    {feedbackAvailable && (new Date(joinedEvent.endTime) < new Date()) &&
                        <Grid item xs={12} pt={1} textAlign="center" sx={{fontStyle: "italic", color: "orange"}}>
                            <span style={{cursor: "pointer"}} onClick={() => {navigate(`/event/${joinedEvent.eventID}/feedback`)}}>Enjoyed this event? Rate other participants here!</span>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button" onClick={() => {navigate(`/event/${joinedEvent.eventID}`)}}>
                    <Button variant="contained" sx={{width: '150px'}}>VIEW</Button>
                </Grid>
                { !joinedEvent.isCancelled && new Date(joinedEvent.endTime) > new Date() && (
                    <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button" onClick={handleLeaveEventAlertOpen}>
                        <Button variant="contained" sx={{width: '150px'}}>LEAVE</Button>
                    </Grid>
                )}
            </Grid>
        </Grid>
        <Dialog open={leaveEventAlertOpen} onClose={handleLeaveEventAlertClose}>
            <DialogTitle>{"Confirm Withdrawal"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to leave this event?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: "15px"}}>
                <Button sx={{background: "red", color: "#FBFBFB", "&:hover": {background: "#FFB84C"}}} onClick={() => {leaveEvent(joinedEvent.eventID); handleLeaveEventAlertClose()}}>Confirm</Button>
                <Button onClick={handleLeaveEventAlertClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default EventCardJoined;