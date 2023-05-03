import { React, useState } from 'react';
import { Box, Button, Grid, Paper, Typography, TextField } from '@mui/material';
import NavbarLoggedIn from '../../navbar_logged/navbar_logged.js';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Timeline,  TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineItemClasses } from '@mui/lab';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import maps from '../../images/maps.jpg';
import cooking from '../../images/cooking.png';
import '../edit_event/edit_event.css';

const initialState = {eventName: "Helloo Goo Too Zoo", eventType: "Entertainment", startDate: "28-04-2023", startTime: "10:20", endDate: "29-04-2023", endTime: "20:15", nrParticipants: 3, description: "Hello Description", mapsAPI: ""};

const CreateEvent = () => {

    const [formData, setFormData] = useState(initialState);

    const [errorMessage, setErrorMessage] = useState("");

    const schema = yup.object().shape({
        nrParticipants: yup.number().positive().integer().min(1, "Number of participants must be greater than or equal to 1").max(100, "Number of participants must be less than or equal to 100"),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const checkDateTime = () => {

        const startDateTime = new Date(formData.startDate + " " + formData.startTime);
        const endDateTime = new Date(formData.endDate + " " + formData.endTime);
    
        if(!formData.startDate)
        {
            setErrorMessage("Please select start time");
            return 0;
        }
        else if(!formData.endDate)
        {
            setErrorMessage("Please select end time");
            return 0;
        }
        else if(endDateTime < startDateTime)
        {
            setErrorMessage("End time is NOT after start time. Please select another end time");
            return 0;
        }
        else
        {
            setErrorMessage("");
            return 1;
        }
    }

    const onSubmit = () => {
        if(checkDateTime())
        {
            console.log(formData);
        }
    }

    const tomorrow = dayjs().add(1, "day");

    return(
        <>
        <NavbarLoggedIn/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="container-edit-event">
                <Paper elevation={0} className="paper">
                    <Grid item className="grid-image">
                        <img src={cooking} alt=""/>
                        <Box className="box">
                            <Typography pl={2} py={1} className="placeholder"><i>{formData.eventType}</i></Typography>
                        </Box>
                    </Grid>
                    <Timeline 
                        sx={{[`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                        }}}
                    >
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot/>
                                <TimelineConnector/>
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography>NAME YOUR EVENT</Typography>
                                <Grid container py={5}>
                                    <TextField required name="eventName" value={formData.eventName} onChange={handleChange} variant="standard" placeholder="Type here your eye-catching title" sx={{width: {xs: 300, sm: 450}, pb: 3}}/>
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
                                <Typography>SELECT TIME</Typography>
                                <Grid container py={3}>
                                    <Grid item xs={12} md={5} className="grid-start" >
                                        <Box>
                                            <Typography>START</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    ampm={false}
                                                    minDate={tomorrow}
                                                    // defaultValue={new Date(formData.startDate + " " + formData.startTime)}
                                                    onChange={(value) => {
                                                        setFormData({...formData, startDate: value.format("YYYY-MM-DD"), startTime: value.format("HH:mm")})}
                                                    } 
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                    <Grid item md={2} className="grid-middle">
                                        <Typography fontSize="20px">-</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={5} className="grid-end">
                                        <Box>
                                            <Typography>END</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    ampm={false}
                                                    minDate={tomorrow}
                                                    // defaultValue={new Date(formData.endDate + " " + formData.endTime)}
                                                    onChange={(value) => {
                                                        setFormData({...formData, endDate: value.format("YYYY-MM-DD"), endTime: value.format("HH:mm")})}
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} pt={3}>
                                        <Typography className="error">{errorMessage}</Typography>
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
                                <Grid container py={4}>
                                    <Grid item xs={12} py={1}>
                                        <TextField
                                            {...register("nrParticipants")}
                                            name="nrParticipants"
                                            value={formData.nrParticipants}
                                            onChange={handleChange}
                                            required
                                            placeholder="Type the number"
                                            type="number"
                                            sx={{width: 250}}
                                            size="small"
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}><Typography className="error">{errors.nrParticipants?.message}</Typography></Grid>
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
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
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
                            <Button type="submit" variant="contained">CREATE EVENT</Button>
                        </Box>
                    </Grid>
                </Paper>
            </Grid>
        </form>
        </>
    )
}

export default CreateEvent;