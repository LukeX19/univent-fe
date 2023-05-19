import { React, useState, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { getEventTypeById, getParticipantsByEventId } from "../../api";
import { format } from "date-fns";
import '../event_card_hosted/event_card_hosted.css';
import cooking from '../images/cooking.png'

const EventCardHosted = ({ hostedEvent }) => {
    const formattedStartTime = format(new Date(hostedEvent.startTime), "dd.MM.yyyy 'at' HH:mm");
    const formattedCreatedDate = format(new Date(hostedEvent.createdDate), "dd.MM.yyyy");

    const [eventType, setEventType] = useState("");
    const [eventTypeLoading, setEventTypeLoading] = useState(true);
    useEffect(() => {
        getEventTypeById(hostedEvent.eventTypeID)
          .then(function (response) {
            setEventType(response.data.name);
            setEventTypeLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [hostedEvent.eventTypeID]);

    const [participantsNumber, setParticipantsNumber] = useState(0);
    useEffect(() => {
        getParticipantsByEventId(hostedEvent.eventID)
          .then(function (response) {
            setParticipantsNumber(response.data.length);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, []);

    return(
        <Grid container pt={3} className="container-card-hosted">
            <Grid item xs={12} md={5} className="grid-image">
                <img src={cooking} width="100%" height="100%"/>
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
            <Grid item xs={12} md={5}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} py={2} textAlign="center">
                        <Typography variant="h5">{hostedEvent.name}</Typography>
                        <Typography>{participantsNumber}/{hostedEvent.maximumParticipants} Participants Joined</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} py={2} textAlign="center">
                        <Typography>Starts on {formattedStartTime}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} textAlign="center">
                        <Typography fontSize="12px">Created on {formattedCreatedDate}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>VIEW</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>EDIT</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>CANCEL</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EventCardHosted;