import { React } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import '../event_card_joined/event_card_joined.css';
import cooking from '../images/cooking.png'

const EventCardJoined = ({joinedEvent}) => {
    return(
        <Grid container pt={3} className="container-card-joined">
            <Grid item xs={12} md={5} className="grid-image">
                <img src={cooking} width="100%" height="100%"/>
                <Box className="box">
                    <Typography pl={2} py={2} className="placeholder">Cooking</Typography>
                </Box>          
            </Grid>
            <Grid item xs={12} md={5}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} py={2} textAlign="center">
                        <Typography variant="h5">{joinedEvent.title}</Typography>
                        <Typography>{joinedEvent.enrolled_participants}/{joinedEvent.total_participants} Participants Joined</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} py={2} textAlign="center">
                        <Typography>{joinedEvent.date} at {joinedEvent.time}</Typography>
                        <Typography>{joinedEvent.address}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} textAlign="center">
                        <Typography fontSize="15px">Created by {joinedEvent.author_lastname} {joinedEvent.author_firstname}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>VIEW</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>LEAVE</Button>
                </Grid>
            </Grid>            
        </Grid>
    );
}

export default EventCardJoined;