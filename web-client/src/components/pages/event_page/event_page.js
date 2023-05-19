import { React, useState, useEffect } from 'react';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { Box, Button, Grid, Slide, Paper, Typography, Dialog, DialogContent, DialogTitle, Divider, Avatar, Rating } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NearMeIcon from '@mui/icons-material/NearMe';
import { deepOrange } from '@mui/material/colors';
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import cooking from "../../images/cooking.png";
import { getEventById, getEventTypeById, getUserProfileById, getParticipantsByEventId, getAverageRatingById } from '../../../api/index.js';
import { format } from "date-fns";
import "../event_page/event_page.css";

const EventPage = () => {
    const param = useParams();

    const [eventInfo, setEventInfo] = useState({});
    const [eventTypeInfo, setEventTypeInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [ratingInfo, setRatingInfo] = useState({ value: 0 });
    useEffect(() => {
        getEventById(param.eventID)
          .then(function (response) {
            setEventInfo(response.data);
            return Promise.all([
              getEventTypeById(response.data.eventTypeID),
              getUserProfileById(response.data.userProfileID),
              getAverageRatingById(response.data.userProfileID)
            ]);
          })
          .then(function ([eventTypeResponse, userProfileResponse, ratingResponse]) {
            setEventTypeInfo(eventTypeResponse.data);
            setUserInfo(userProfileResponse.data.basicInfo);
            setRatingInfo(ratingResponse.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [param.eventID]);

    const [participantsList, setParticipantsList] = useState([]);
    const [participantsNumber, setParticipantsNumber] = useState(0);
    useEffect(() => {
        getParticipantsByEventId(param.eventID)
          .then(function (response) {
            setParticipantsList(response.data);
            setParticipantsNumber(response.data.length);
      
            // Create an array of promises for fetching ratings
            const ratingPromises = response.data.map((participant) =>
              getAverageRatingById(participant.userProfileID)
            );
      
            // Fetch all ratings and update participantsList
            Promise.all(ratingPromises)
              .then((ratingResponses) => {
                const updatedParticipants = response.data.map((participant, index) => ({
                  ...participant,
                  rating: ratingResponses[index].data.value,
                }));
                setParticipantsList(updatedParticipants);
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [param.eventID]);

    const formattedStartDate = eventInfo.startTime ? 
        format(new Date(eventInfo.startTime), "dd.MM.yyyy 'at' HH:mm")
    : '';
    const formattedEndTime = eventInfo.endTime ? 
        format(new Date(eventInfo.endTime), "dd.MM.yyyy 'at' HH:mm")
    : '';

    const storedMapCenter = {
        lat: parseFloat(eventInfo.locationLat),
        lng: parseFloat(eventInfo.locationLng)
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const participants = [
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 4.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 4.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 4.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 2.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 4.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 1.5
        }, 
        {   
            image: '',
            lastname: "Chiara",
            firstname: "Charlotte - Ava",
            rating: 4.5
        }, 
    ];

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    })

    const[map, setMap] = useState(/** @type google.maps.Map */ (null));

    if(!isLoaded){
        return(
            <></>
        )
    }

    return(
        <>
            <NavbarLoggedIn/>
            <Grid container className="container-event-page">
                <Paper elevation={0} className="paper">

                    <Grid item className="grid-image">
                        <img src={cooking} alt=""/>
                        <Box className="box">
                            <Typography pl={2} py={1} className="placeholder">{eventTypeInfo.name}</Typography>
                        </Box>
                    </Grid>

                    <Grid container my={2}>
                        <Grid item xs={12} md={8} py={2}>
                            <Typography py={1} fontSize="30px">{eventInfo.name}</Typography>
                            <Grid container>
                                <Grid item xs={12} py={1}>
                                    <Typography>Created by</Typography>
                                </Grid>
                                <Grid item py={1}>
                                    {
                                        userInfo.profilePicture !== "" ?
                                        (
                                            <Avatar src={userInfo.profilePicture}/>
                                        )
                                        :
                                        (
                                            <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}}>
                                                {userInfo.lastName.charAt(0)}
                                                {userInfo.firstName.charAt(0)}
                                            </Avatar>
                                        )
                                    }
                                </Grid>
                                <Grid item px={2}>
                                    <Typography>{userInfo.firstName} {userInfo.lastName}</Typography>
                                    <Rating readOnly precision={0.1} value={ratingInfo.value}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item py={4} xs={12} md={4}>
                            <Grid container>
                                {eventInfo.startTime && (
                                    [
                                        {icon: <Diversity3Icon className="icon"/>, text: `${participantsNumber}/${eventInfo.maximumParticipants} Participants Joined`},
                                        {icon: <EventAvailableIcon className="icon"/>, text: formattedStartDate},
                                        {icon: <EventBusyIcon className="icon"/>, text: formattedEndTime}
                                        //{icon: <AccessTimeIcon className="icon"/>, text: formattedStartTime},
                                    ]).map(({ icon, text }, index) => (
                                        <Grid item key={index} xs={12} py={1} display="flex">
                                            {icon} <Typography px={3} fontSize="18px">{text}</Typography>
                                        </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item my={3}>
                        <Typography pb={2} variant="h6">Description</Typography>
                        <Divider/>
                        <Typography py={2}>{eventInfo.description}</Typography>
                    </Grid>

                    <Grid item my={3}>
                        <Typography pb={2} variant="h6">Location on the map</Typography>
                        <Divider />
                        <Box py={2}>
                            { eventInfo.locationLat && eventInfo.locationLng && (
                                <GoogleMap
                                    center={storedMapCenter}
                                    zoom={15}
                                    mapContainerStyle={{width: "100%", height: "600px"}}
                                    onLoad={(map) => setMap(map)}
                                >
                                    <Grid item height="50px" position="relative" sx={{mt: 10}}>
                                        <Box position="absolute" bottom="0px" left="0px">
                                            <Button variant="contained" sx={{left: "8%", backgroundColor: "white", color: "black", "&:hover":{backgroundColor: '#FBFBFB'}, pl: 1, pr: 2}} onClick={() => map.panTo(storedMapCenter)}><NearMeIcon sx={{mr: 1}}/>Recenter</Button>
                                        </Box>
                                    </Grid>

                                    <MarkerF position={storedMapCenter}/>
                                </GoogleMap>
                            )}
                        </Box>
                    </Grid>

                    {/* <Grid item xs={12} py={0}>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button variant="contained" onClick={handleOpen} sx={{mr: 2, background: '#8FBDD3'}}>CHECK ENROLLED PARTICIPANTS</Button>
                            <Button variant="contained">JOIN EVENT</Button>
                        </Box>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" onClick={handleOpen} sx={{mr: 2, background: "#8FBDD3"}}>CHECK ENROLLED PARTICIPANTS</Button>
                            <Button variant="contained">JOIN EVENT</Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
            <Dialog className="dialog-event-page" scroll={"paper"} onClose={handleClose} open={open} TransitionComponent={Slide} TransitionProps={{direction: "up", timeout: {enter: 600, exit: 300}}}>
                <DialogTitle sx={{textAlign: 'center'}}>List of Enrolled Participants
                    <IconButton onClick={handleClose} sx={{position: "absolute", right: 9, top: 10}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="dialog-content" dividers={true}>
                    { participantsList.length === 0 ?
                        (
                            <Typography style={{ textAlign: 'center' }}>No participants enrolled in this event yet.</Typography>
                        )
                        :
                        (
                            participantsList.map((participant, index) => (
                                <Grid container py={2} className="participant-container" key={index}>
                                    <Grid item mr={1.5}>
                                    { participant.basicInfo.profilePicture !== "" ? (
                                        <Avatar src={participant.basicInfo.profilePicture} />
                                    )
                                    :
                                    (
                                        <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] } }}>
                                            {participant.basicInfo.lastName.charAt(0)}
                                            {participant.basicInfo.firstName.charAt(0)}
                                        </Avatar>
                                    )}
                                    </Grid>
                                    <Grid item>
                                        <Typography>{participant.basicInfo.lastName} {participant.basicInfo.firstName}</Typography>
                                        <Rating readOnly precision={0.1} value={participant.rating}/>
                                    </Grid>
                                </Grid>
                            ))
                        )
                    }
                </DialogContent>
            </Dialog> 
        </>
    )
}

export default EventPage;