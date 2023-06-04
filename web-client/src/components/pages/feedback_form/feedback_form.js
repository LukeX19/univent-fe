import { React, useState, useEffect } from "react";
import { Box, Button, Grid, Paper, Typography, Avatar, Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { getEventById, getParticipantsByEventId, addRating, markFeedbackSent, getUserProfileById } from "../../../api/index.js";
import { format } from "date-fns";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import "../feedback_form/feedback_form.css";

const FeedbackForm = () => {
    const param = useParams();
    const navigate = useNavigate();
    const decoded_token = jwt_decode(localStorage.getItem("token"));

    const [eventInfo, setEventInfo] = useState({});
    const [participantsList, setParticipantsList] = useState([]);
    const [participantsRatings, setParticipantsRatings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventResponse, participantsResponse] = await Promise.all([
                    getEventById(param.eventID),
                    getParticipantsByEventId(param.eventID)
                ]);
    
                //Exclude the logged-in user from participants list in the feedback form
                const participants = participantsResponse.data.filter(
                    participant => participant.userProfileID !== decoded_token.UserProfileId
                );

                //Retrieve user author
                const userAuthorResponse = await getUserProfileById(eventResponse.data.userProfileID);
                const userAuthor = userAuthorResponse.data;
    
                //Add user author to the participants list
                const updatedParticipants = [userAuthor, ...participants];
    
                //Set the updated participants list
                setParticipantsList(updatedParticipants);

                //Set initial value to 0 for Rating component
                const ratings = updatedParticipants.map(participant => ({
                    userProfileID: participant.userProfileID,
                    value: 0
                }));

                setParticipantsRatings(ratings);
                setEventInfo(eventResponse.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [param.eventID, decoded_token.UserProfileId]);

    const formattedStartTime = eventInfo.startTime ? 
        format(new Date(eventInfo.startTime), "dd.MM.yyyy 'at' HH:mm")
    : '';
    const formattedEndTime = eventInfo.endTime ? 
        format(new Date(eventInfo.endTime), "dd.MM.yyyy 'at' HH:mm")
    : '';

    const handleRatingChange = (index, newValue) => {
        setParticipantsRatings(prevRatings => {
          const updatedRatings = [...prevRatings];
          updatedRatings[index].value = newValue;
          return updatedRatings;
        });
    };

    const sendRatings = () => {
        markFeedbackSent(param.eventID)
        .then(function (response) {
            console.log(response.status);
        })
          .catch(function (error) {
            console.log(error);
        });

        participantsRatings.forEach(({ userProfileID, value }) => {
            addRating({
                userProfileID: userProfileID,
                value: value
            })
            .then(response => {
                console.log(response.status);
            })
            .catch(function (error) {
                console.log(error);
            });
        });

        navigate("/profile");
    };
    
    return(
        <>
        <NavbarLoggedIn/>
        <Grid container className="container-feedback-form">
            <Paper elevation={0} className="paper">
                <Grid container pb={2}>
                    <Grid item xs={12} py={2} className="grid">
                        <Typography variant="h5">Feedback Form</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <Typography variant="h6">"{eventInfo.name}" Event</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <EventAvailableIcon className="icon"/><Typography variant="h6" px={1}>Started {formattedStartTime}</Typography>
                    </Grid>
                    <Grid item xs={12} className="grid">
                        <EventBusyIcon className="icon"/><Typography variant="h6" px={1}>Ended {formattedEndTime}</Typography>
                    </Grid> 
                </Grid>
                <div className="container">
                    { participantsList.map((participant, index) => {
                        return(
                            <Grid container py={2} alignItems={"center"} key={index}>
                                <Grid item xs={2} className="grid">
                                    { participant.basicInfo.profilePicture !== "" ? (
                                        <Avatar alt="avatar" src={participant.basicInfo.profilePicture} className="img"/>
                                    )
                                    :
                                    (
                                        <Avatar alt="avatar" sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}} className="img">
                                            <Typography variant="h1" component="span" sx={{ fontSize: "2rem" }}>
                                                {participant.basicInfo.lastName.charAt(0)}
                                                {participant.basicInfo.firstName.charAt(0)}
                                            </Typography>
                                        </Avatar>
                                    )}
                                </Grid>
                                <Grid item xs={6} pr={4} className="grid">
                                    <Typography variant="h6">{participant.basicInfo.lastName} {participant.basicInfo.firstName}</Typography>
                                </Grid>
                                <Grid item xs={4} className="grid" pr={4}>
                                    <Rating
                                        sx={{fontSize: '2rem'}}
                                        precision={0.5}
                                        value={participantsRatings[index].rating}
                                        onChange={(event, newValue) => handleRatingChange(index, newValue)}
                                    />
                                </Grid>
                            </Grid>
                        )
                    })}
                </div>
                <Grid item xs={12} py={1}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" sx={{background: "#68B984", ":hover" : {background: '#68B984'}}} onClick={() => {sendRatings()}}>SEND</Button>
                    </Box>
                </Grid>
            </Paper>
        </Grid>
        </>
    )
}

export default FeedbackForm;