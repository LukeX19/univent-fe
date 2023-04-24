import { React } from 'react';
import "../create_event/create_event.css";
import { Box, Button, Grid, Paper, Typography, Autocomplete, TextField } from '@mui/material';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import cooking from "../../images/cooking.png";
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Timeline,  TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineItemClasses } from '@mui/lab';
import maps from "../../images/maps.jpg"


const CreateEvent = () => {
    return(
        <>
            <NavbarLoggedIn/>
            <Grid container className="container-create-event">
                <Paper elevation={0} className="paper">
                    <Grid item className="grid-image">
                        <img src={cooking} alt=""/>
                        <Box className="box">
                            <Typography sx={{pl: 2, py: 1, color: 'white', fontSize: '20px'}}><i>Cover image is automatically generated based on the type of event</i></Typography>
                        </Box>
                    </Grid>
                    <Timeline 
                        sx={{[`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                        }}}>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>NAME YOUR EVENT</Typography>
                                <Grid container py={5}>
                                    <TextField variant="standard" placeholder="Type here your eye-catching title" sx={{width: {xs: 300, sm: 450}, pb: 3}}/>
                                    <Typography color="grey"><i>Note: We recommend you to brainstorm, in order to find a charming and captivating name for your event. <br></br>Example : "Taste - Tastic" I Can Cook</i></Typography>
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>CHOOSE EVENT TYPE</Typography>
                                <Grid container py={5}>
                                    <Autocomplete
                                        disablePortal
                                        options={['Cooking', 'Karaoke', 'Dance']}
                                        sx={{width: 300}}
                                        renderInput={(params) => <TextField {...params} size="small" variant="standard" placeholder="Select event type"/>}
                                    />
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>SELECT TIME</Typography>
                                <Grid container py={5}>
                                    <Grid item xs={12} md={5} className="grid-start" >
                                        <Box>
                                            <Typography>START</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>

                                    <Grid item md={2} className="grid-middle">
                                        <Typography sx={{fontSize: '20px'}}>-</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={5} className="grid-end">
                                        <Box>
                                            <Typography>END</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>SELECT THE NUMBER OF PARTICIPANTS</Typography>
                                <Grid container py={5}>
                                    <TextField
                                        placeholder="Type the number"
                                        type="number"
                                        sx={{width: 250}}
                                        size="small"
                                    />
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>DESCRIBE YOUT EVENT</Typography>
                                <Grid container py={5}>
                                    <TextField
                                        placeholder="Type here"
                                        multiline
                                        maxRows={10}
                                        fullWidth
                                    />
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>MAPS API</Typography>
                                <Grid container py={5}>
                                    <img src={maps}/>
                                </Grid>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                    <Grid item pr={5}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained">CREATE EVENT</Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default CreateEvent;