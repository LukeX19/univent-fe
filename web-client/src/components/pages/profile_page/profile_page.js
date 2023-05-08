import { React, useState } from 'react';
import { Button, Tab, Tabs, Box, Rating, Avatar, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import NavbarLoggedIn from '../../navbar_logged/navbar_logged.js';
import EventCardHosted from '../../event_card_hosted/event_card_hosted.js';
import EventCardJoined from '../../event_card_joined/event_card_joined.js';
import girl from '../../images/girl.jpg';
import '../profile_page/profile_page.css';

const ProfilePage = () => {

    const [value, setValue] = useState('first');

    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const hostedEvents = [
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            date_created: "12 Oct. 2022"
        }, 
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            date_created: "12 Oct. 2022"
        }, 
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            date_created: "12 Oct. 2022"
        }
    ];

    const joinedEvents = [
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            author_lastname: "Chiara",
            author_firstname: "Charlotte - Ava",
            rating: 2.5
        }, 
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            author_lastname: "Chiara",
            author_firstname: "Charlotte - Ava",
            rating: 2.5
        }, 
        {   
            title: 'Taste - Tastic “I Can Cook”',
            image: '',
            enrolled_participants: 3,
            total_participants: 6,
            date: "28 Oct. 2023",
            time: "16:00",
            address: "Victory Square, Timișoara",
            author_lastname: "Chiara",
            author_firstname: "Charlotte - Ava",
            rating: 2.5
        }, 
    ];

    return(
        <>
        <NavbarLoggedIn/>
        <Grid container className="container-profile">
            <Grid container className="container">
                <Grid item xs={12} mb={3} className="info-grid-item">
                    <Grid container>
                        <Grid item xs={12} md={3} className="avatar-grid-item">
                            <Avatar alt="avatar" src={girl} className="avatar">CC</Avatar>
                        </Grid>
                        <Grid item xs={12} md={9} sx={{background: 'transparent', position: {xs :'block', md: 'relative'}}}>
                            <Box className="box" sx={{position: {xs: 'none', md: 'absolute'}, pl: 2}}>
                                <Box py={1} className="info">
                                    <Typography variant="h5">Chiara Charlotte - Ava  </Typography>
                                    <EditIcon className="edit-icon"/> 
                                </Box>
                                <Typography><AccountBalanceIcon className="university-icon"/>Victor Babes University of Medicine and Pharmacy Timisoara, 2nd year</Typography>
                                <Box className="info">
                                    <Typography mr={1}>Rating:</Typography>
                                    <Typography mr={1}>4.4</Typography>
                                    <Rating readOnly precision={0.1} value={4.4} />
                                </Box>
                                <Typography sx={{fontSize: '15px', color: 'grey'}}>Joined on 17 Oct. 2022</Typography>
                            </Box>  
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab value="first" label="Hosted"/>
                        <Tab value="second" label="Joined"/>
                    </Tabs>
                </Grid>

                {value === "first" &&   <Grid item xs={12}>
                                            {hostedEvents.map((hostedEvent, index) => {
                                                return(
                                                    <Grid item xs={12} className="grid-item" key={index}>
                                                        <EventCardHosted hostedEvent={hostedEvent}/>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                }

                {value === "second" &&   <Grid item xs={12}>
                                            {joinedEvents.map((joinedEvent, index) => {
                                                return(
                                                    <Grid item xs={12} className="grid-item" key={index}>
                                                        <EventCardJoined joinedEvent={joinedEvent}/>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                }                               

            </Grid>
        </Grid>
     
        {/* <div className={`sidebar ${isOpen? "open" : ""}`}>
            <IconButton className="icon-button" onClick={handleToggle}>
                {isOpen? <CloseIcon/> : <ArrowForwardIosIcon/>}
            </IconButton>
            <Avatar alt="avatar" src={girl} className="avatar">CC</Avatar>
            <Typography py={1}>Chiara Charlotte - Ava</Typography>
            <Rating readOnly precision={0.1} value={4.4} />
            <Typography py={1}> <AccountBalanceIcon fontSize="0.9rem"/>Victor Babes University of Medicine and Pharmacy Timisoara, 2nd year</Typography>
            <Button variant="contained" size="small">EDIT</Button>
            <Box sx={{position: "absolute", bottom: "4%"}}>
                <Typography color="red">Delete Account</Typography>
                <Typography pt={2} color="grey">Joined on 17 Oct. 2022</Typography>
            </Box>
        </div> */}

        </>
    )
}

export default ProfilePage;