import { React, useState } from 'react';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { Box, Button, Grid, Slide, Paper, Typography, Dialog, DialogContent, DialogTitle, Divider, Avatar, Rating } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NearMeIcon from '@mui/icons-material/NearMe';
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api"
import cooking from "../../images/cooking.png";
import girl from "../../images/girl.jpg"
import maps from "../../images/maps.jpg"
import "../event_page/event_page.css"

const mapCenter = { lat: 45.75639952850472, lng: 21.228483690976592}
localStorage.setItem('mapCenter', JSON.stringify(mapCenter));
const storedMapCenter = JSON.parse(localStorage.getItem('mapCenter'));

const EventPage = () => {

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
                            <Typography pl={2} py={1} className="placeholder">Cooking</Typography>
                        </Box>
                    </Grid>

                    <Grid container my={2}>
                        <Grid item xs={12} md={8} py={2}>
                            <Typography py={1} fontSize="30px">"Taste - Tastic" I Can Cook</Typography>
                            <Grid container>
                                <Grid item xs={12} py={1}>
                                    <Typography>Created by</Typography>
                                </Grid>
                                <Grid item py={1}>
                                    <Avatar alt="avatar" src={girl}>CC</Avatar>
                                </Grid>
                                <Grid item px={2}>
                                    <Typography>Chiara Charlotte - Ava</Typography>
                                    <Rating readOnly precision={0.5} value={4.5}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item py={2} xs={12} md={4}>
                            <Grid container>
                                {[
                                    {icon: <Diversity3Icon className="icon"/>, text: "3/6 Participants Joined"},
                                    {icon: <PinDropIcon className="icon"/>, text: "Victory Square, Timisoara"},
                                    {icon: <CalendarMonthIcon className="icon"/>, text: "28 Oct. 2023"},
                                    {icon: <AccessTimeIcon className="icon"/>, text: "18:00"},
                                ].map(({ icon, text }, index) => (
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
                        <Typography py={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tellus quam, accumsan et quam sed, consequat iaculis nunc. Quisque vestibulum lorem in ante pulvinar placerat. Cras molestie justo enim. Donec eu est eu est rutrum tempor dignissim quis lacus. Nunc maximus feugiat lacinia. Quisque leo arcu, elementum sit amet gravida ut, fermentum semper odio. Maecenas eget laoreet turpis. Maecenas molestie elit ac sagittis egestas. Suspendisse dictum bibendum orci. Donec dictum ultrices nibh congue commodo. <br></br> Nam condimentum nulla in hendrerit consectetur. Vestibulum eget libero quis diam malesuada imperdiet ut at ipsum. Donec ligula sem, consectetur nec leo vitae, viverra efficitur lectus. Nam neque dui, rutrum eget tortor id, ultricies ornare neque. Phasellus ullamcorper nibh tellus, vitae tristique dui varius vitae. Fusce eget sem nisl. Nam ac convallis ex, ut ultricies sapien. Aenean vitae sem nulla. Fusce congue varius aliquam. Donec mollis orci sit amet tortor venenatis aliquam.</Typography>
                    </Grid>

                    <Grid item my={3}>
                        <Typography pb={2} variant="h6">Location on the map</Typography>
                        <Divider />
                        <Box py={2}>
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
                    {participants.map((participant, index) => {
                        return(
                            <Grid container py={2} className="participant-container" key={index}>
                                <Grid item mr={1.5}>
                                    <Avatar alt="avatar" src={participant.image}>{participant.lastname.charAt(0)}{participant.firstname.charAt(0)}</Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography>{participant.lastname} {participant.firstname}</Typography>
                                    <Rating readOnly precision={0.5} value={participant.rating}/>
                                </Grid>
                            </Grid>
                        )
                    })}
                </DialogContent>
            </Dialog> 
        </>
    )
}

export default EventPage;