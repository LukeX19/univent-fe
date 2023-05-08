import { React } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import '../event_card_hosted/event_card_hosted.css';
import cooking from '../images/cooking.png'

const EventCardHosted = ({hostedEvent}) => {
    return(
        <Grid container pt={3} className="container-card-hosted">
            <Grid item xs={12} md={5} className="grid-image">
                <img src={cooking} width="100%" height="100%"/>
                <Box className="box">
                    <Typography pl={2} py={2} className="placeholder">Cooking</Typography>
                </Box>          
            </Grid>
            <Grid item xs={12} md={5}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} py={2} textAlign="center">
                        <Typography variant="h5">{hostedEvent.title}</Typography>
                        <Typography>{hostedEvent.enrolled_participants}/{hostedEvent.total_participants} Participants Joined</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} py={2} textAlign="center">
                        <Typography>{hostedEvent.date} at {hostedEvent.time}</Typography>
                        <Typography>{hostedEvent.address}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} textAlign="center">
                        <Typography fontSize="12px">Created on {hostedEvent.date_created}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={2}>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>END</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>EDIT</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>CANCEL</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} px={{xs: 5, sm: 3, md: 2}} py={{xs: 2, sm: 4, md: 1}} className="grid-button">
                    <Button variant="contained" sx={{width: '150px'}}>VIEW</Button>
                </Grid>
            </Grid>            
        </Grid>
    );
}

export default EventCardHosted;