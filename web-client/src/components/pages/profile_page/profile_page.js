import { React, useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tab, Tabs, Box, Rating, Avatar, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import EventCardHosted from "../../event_card_hosted/event_card_hosted.js";
import EventCardJoined from "../../event_card_joined/event_card_joined.js";
import jwt_decode from "jwt-decode";
import { getUserProfileById, getUniversityById, getAverageRatingById, getEventsByUserId, getEventsByParticipantId, deleteUserProfile } from "../../../api/index.js";
import { format } from "date-fns";
import "../profile_page/profile_page.css";

const ProfilePage = () => {
    const navigate = useNavigate();

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

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
    const handleDeleteAlertOpen = () => {
        setDeleteAlertOpen(true);
    };
    const handleDeleteAlertClose = () => {
        setDeleteAlertOpen(false);
    };

    const deleteAccount = () => {
        deleteUserProfile(decoded_token.UserProfileId)
        .then(function (response) {
            console.log(response.status);
            navigate("/");
        })
          .catch(function (error) {
            console.log(error);
        });
    };

    const yearOptions = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'I Master',
        8: 'II Master'
      };

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
                                    <EditIcon className="edit-icon" onClick={() => {navigate("/profile/edit")}}/>
                                    <VpnKeyIcon className="key-icon" onClick={() => {navigate("/profile/change-password")}}/>
                                </Box>
                                <Typography><AccountBalanceIcon className="university-icon"/>{universityInfo.name}, Year: {yearOptions[yearInfo]}</Typography>
                                <Box className="info">
                                    <Typography mr={1}>Rating:</Typography>
                                    <Typography mr={1}>{ratingInfo.value}</Typography>
                                    <Rating readOnly precision={0.1} value={ratingInfo.value}/>
                                </Box>
                                <Typography pt={1} sx={{fontSize: '15px', color: 'grey'}}>Joined on {formattedJoinedDate}</Typography>
                                <Typography sx={{fontSize: '15px', color: 'red'}}><span style={{ cursor: 'pointer' }} onClick={handleDeleteAlertOpen}>Delete Account</span></Typography>
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
        <Dialog open={deleteAlertOpen} onClose={handleDeleteAlertClose}>
            <DialogTitle>{"Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete your account?
                    <br/>
                    This action can not be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: "15px"}}>
                <Button sx={{background: "red", color: "#FBFBFB", "&:hover": {background: "#FFB84C"}}} onClick={() => {deleteAccount()}}>Delete</Button>
                <Button onClick={handleDeleteAlertClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default ProfilePage;