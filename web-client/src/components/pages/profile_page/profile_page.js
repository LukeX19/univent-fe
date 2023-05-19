import { React, useState, useEffect } from 'react';
import { Button, Tab, Tabs, Box, Rating, Avatar, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import NavbarLoggedIn from '../../navbar_logged/navbar_logged.js';
import EventCardHosted from '../../event_card_hosted/event_card_hosted.js';
import EventCardJoined from '../../event_card_joined/event_card_joined.js';
import jwt_decode from "jwt-decode";
import { getUserProfileById, getUniversityById, getAverageRatingById, getEventsByUserId, getEventsByParticipantId } from "../../../api/index.js";
import { format } from "date-fns";
import girl from '../../images/girl.jpg';
import '../profile_page/profile_page.css';

const ProfilePage = () => {
    const decoded_token = jwt_decode(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({});
    const [universityInfo, setUniversityInfo] = useState({});
    const [yearInfo, setYearInfo] = useState({});
    const [ratingInfo, setRatingInfo] = useState({ value: 0 });
    const [accountDate, setAccountDate] = useState('');
    useEffect(() => {
        getUserProfileById(decoded_token.UserProfileId)
          .then(function (response) {
            setYearInfo(response.data.year);
            setAccountDate(response.data.createdDate);
            setUserInfo(response.data.basicInfo);
      
            return Promise.all([
              getUniversityById(response.data.universityID),
              getAverageRatingById(decoded_token.UserProfileId)
            ]);
          })
          .then(function ([universityResponse, ratingResponse]) {
            setUniversityInfo(universityResponse.data);
            setRatingInfo(ratingResponse.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);

    const [hostedEvents, setHostedEvents] = useState([]);
    const [joinedEvents, setJoinedEvents] = useState([]);
    useEffect(() => {
        Promise.all([
            getEventsByUserId(decoded_token.UserProfileId),                         //hosted events
            getEventsByParticipantId(decoded_token.UserProfileId)                   //joined events
        ]).then(function ([eventsByUserResponse, eventsByParticipantResponse]) {
            setHostedEvents(eventsByUserResponse.data);
            setJoinedEvents(eventsByParticipantResponse.data);
        })
        .catch(function (error) {
            console.log(error);
          });
    }, []);

    const formattedJoinedDate = accountDate ? 
        format(new Date(accountDate), "dd.MM.yyyy")
    : '';

    const [value, setValue] = useState('first');

    const [isOpen, setIsOpen] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // const hostedEvents = [
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         date_created: "12 Oct. 2022"
    //     }, 
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         date_created: "12 Oct. 2022"
    //     }, 
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         date_created: "12 Oct. 2022"
    //     }
    // ];

    // const joinedEvents = [
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         author_lastname: "Chiara",
    //         author_firstname: "Charlotte - Ava",
    //         rating: 2.5
    //     }, 
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         author_lastname: "Chiara",
    //         author_firstname: "Charlotte - Ava",
    //         rating: 2.5
    //     }, 
    //     {   
    //         title: 'Taste - Tastic “I Can Cook”',
    //         image: '',
    //         enrolled_participants: 3,
    //         total_participants: 6,
    //         date: "28 Oct. 2023",
    //         time: "16:00",
    //         address: "Victory Square, Timișoara",
    //         author_lastname: "Chiara",
    //         author_firstname: "Charlotte - Ava",
    //         rating: 2.5
    //     }, 
    // ];

    return(
        <>
        <NavbarLoggedIn/>
        <Grid container className="container-profile">
            <Grid container className="container">
                <Grid item xs={12} mb={3} className="info-grid-item">
                    <Grid container>
                        <Grid item xs={12} md={3} className="avatar-grid-item">
                            {
                                userInfo.profilePicture !== "" ?
                                (
                                    <Avatar alt="avatar" src={userInfo.profilePicture} className="avatar"/>
                                )
                                :
                                (
                                    <Avatar alt="avatar" sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}} className="avatar">
                                        <Typography variant="h1" component="span" sx={{ fontSize: "7rem" }}>
                                            {userInfo.lastName.charAt(0)}
                                            {userInfo.firstName.charAt(0)}
                                        </Typography>
                                    </Avatar>
                                )
                            }
                        </Grid>
                        <Grid item xs={12} md={9} sx={{background: 'transparent', position: {xs :'block', md: 'relative'}}}>
                            <Box className="box" sx={{position: {xs: 'none', md: 'absolute'}, pl: 2}}>
                                <Box py={1} className="info">
                                    <Typography variant="h5">{userInfo.lastName} {userInfo.firstName}</Typography>
                                    <EditIcon className="edit-icon"/> 
                                </Box>
                                <Typography><AccountBalanceIcon className="university-icon"/>{universityInfo.name}, Year: {yearInfo.toString()}</Typography>
                                <Box className="info">
                                    <Typography mr={1}>Rating:</Typography>
                                    <Typography mr={1}>{ratingInfo.value}</Typography>
                                    <Rating readOnly precision={0.1} value={ratingInfo.value}/>
                                </Box>
                                <Typography sx={{fontSize: '15px', color: 'grey'}}>Joined on {formattedJoinedDate}</Typography>
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

                { value === "first" &&
                    <Grid item xs={12}>
                        { hostedEvents.map((hostedEvent, index) => {
                            return(
                                <Grid item xs={12} className="grid-item" key={index}>
                                    <EventCardHosted hostedEvent={hostedEvent}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                }

                { value === "second" &&
                    <Grid item xs={12}>
                        { joinedEvents.map((joinedEvent, index) => {
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
        </>
    )
}

export default ProfilePage;