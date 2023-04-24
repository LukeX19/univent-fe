import { React, useState } from 'react';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { Box, Button, Grid, Slide, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField, Divider, Avatar, Rating } from '@mui/material';
import cooking from "../../images/cooking.png";
import "../event_page/event_page.css"
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import girl from "../../images/girl.jpg"
import maps from "../../images/maps.jpg"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const EventPage = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <>
            <NavbarLoggedIn/>
            <Grid container className="container-event-page">
                <Paper elevation={0} className="paper">

                    <Grid item className="grid-image">
                        <img src={cooking} alt=""/>
                        <Box className="box">
                            <Typography sx={{pl: 2, py: 1, color: 'white', fontSize: '20px'}}>Cooking</Typography>
                        </Box>
                    </Grid>

                    <Grid container my={2}>
                        <Grid item xs={12} md={8} py={2}>
                            <Typography sx={{fontSize: '30px', py: 1}}>"Taste - Tastic" I Can Cook</Typography>
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
                                    { icon: <Diversity3Icon sx={{fontSize: '1.5rem'}} />, text: '3/6 Participants Joined' },
                                    { icon: <PinDropIcon sx={{fontSize: '1.5rem'}} />, text: 'Victory Square, Timisoara' },
                                    { icon: <CalendarMonthIcon sx={{fontSize: '1.5rem'}} />, text: '28 Oct. 2023' },
                                    { icon: <AccessTimeIcon sx={{fontSize: '1.5rem'}} />, text: '18:00' },
                                ].map(({ icon, text }, index) => (
                                    <Grid item key={index} xs={12} py={1} display="flex">
                                        {icon} <Typography sx={{fontSize: '18px', px: 3}}>{text}</Typography>
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
                            <img src={maps}/>
                        </Box>
                    </Grid>

                    {/* <Grid item xs={12} py={0}>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button variant="contained" onClick={handleOpen} sx={{mr: 2, background: '#8FBDD3'}}>CHECK ENROLLED PARTICIPANTS</Button>
                            <Button variant="contained">JOIN EVENT</Button>
                        </Box>
                    </Grid> */}
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between'>
                            <Button variant="contained" onClick={handleOpen} sx={{ background: '#8FBDD3'}}>CHECK ENROLLED PARTICIPANTS</Button>
                            <Button variant="contained">JOIN EVENT</Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
            <Dialog className="dialog" scroll={"paper"} onClose={handleClose} open={open} TransitionComponent={Slide} TransitionProps={{direction: 'up', timeout: {enter: 600, exit: 300}}}>
                <DialogTitle sx={{ textAlign: 'center' }}>List of Participants
                    <IconButton onClick={handleClose} sx={{position: 'absolute', right: 9, top: 10}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="dialog-content" dividers={true}>
                        <Grid container py={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item mr={2}>
                                <Avatar alt="avatar" src={girl}>CC</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography>Chiara Charllote - Ava</Typography>
                                <Rating readOnly precision={0.5} value={4.5}/>
                            </Grid>
                        </Grid>
                        <Grid container py={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item mr={2}>
                                <Avatar alt="avatar" src={girl}>CC</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography>Chiara Charllote - Ava</Typography>
                                <Rating readOnly precision={0.5} value={4.5}/>
                            </Grid>
                        </Grid>
                        <Grid container py={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item mr={2}>
                                <Avatar alt="avatar" src={girl}>CC</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography>Chiara Charllote - Ava</Typography>
                                <Rating readOnly precision={0.5} value={4.5}/>
                            </Grid>
                        </Grid>
                        <Grid container py={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Grid item mr={2}>
                                <Avatar alt="avatar" src={girl}>CC</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography>Chiara Charllote - Ava</Typography>
                                <Rating readOnly precision={0.5} value={4.5}/>
                            </Grid>
                        </Grid>
                </DialogContent>
            </Dialog> 
        </>
    )
}

export default EventPage;