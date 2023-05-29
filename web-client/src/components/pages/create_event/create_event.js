import { React, useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography, TextField, InputBase, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import NearMeIcon from '@mui/icons-material/NearMe';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Timeline,  TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, timelineItemClasses } from '@mui/lab';
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import dayjs from 'dayjs';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";
import { getAllEventTypes, addEvent } from "../../../api/index.js";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import cooking from "../../../images/cooking.png";
import "../create_event/create_event.css";

const initialState = {eventName: "", eventType: "", startDate: "", startTime: "", endDate: "", endTime: "", nrParticipants: "", description: "", mapsLat: "", mapsLng: ""};

const mapCenter = { lat: 45.75639952850472, lng: 21.228483690976592};
const libraries = ['places'];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #BDBDBD',
    width: '100%',
    background: 'white'
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#BDBDBD'
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    },
}));

const CreateEvent = () => {
    const navigate = useNavigate();

    const [eventTypes, setEventTypes] = useState([]);
    useEffect(() => {
        getAllEventTypes().then(function (response) {
            setEventTypes(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const [formData, setFormData] = useState(initialState);

    const [errorMessage, setErrorMessage] = useState("");

    const schema = yup.object().shape({
        nrParticipants: yup.number().positive().integer().min(1, "Number of participants must be greater than or equal to 1").max(25, "Number of participants must be less than or equal to 25"),
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
    };

    const onSubmit = () => {
        if(checkDateTime())
        {
            const formattedStartTime = format(new Date(formData.startDate + ' ' + formData.startTime), "yyyy-MM-dd'T'HH:mm:ss.SSS");
            const formattedEndTime = format(new Date(formData.endDate + ' ' + formData.endTime), "yyyy-MM-dd'T'HH:mm:ss.SSS");
            addEvent(
                {
                    eventTypeID: formData.eventType,
                    name: formData.eventName,
                    description: formData.description,
                    maximumParticipants: formData.nrParticipants,
                    startTime: formattedStartTime,
                    endTime: formattedEndTime,
                    locationLat: formData.mapsLat,
                    locationLng: formData.mapsLng
                }
            ).then(function (response) {
                console.log(response.status);
                navigate("/feed");
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    const tomorrow = dayjs().add(1, 'day');

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
        libraries: libraries
    });

    const[map, setMap] = useState(/** @type google.maps.Map */ (null));

    const [marker, setMarker] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);

    if(!isLoaded){
        return(
            <></>
        )
    }

    return(
        <>
        <NavbarLoggedIn/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="container-create-event">
                <Paper elevation={0} className="paper">
                    <Grid item className="grid-image">
                        <img src={cooking} alt=""/>
                        <Box className="box">
                            <Typography pl={2} py={1} className="placeholder"><i>Cover image is automatically generated based on the type of event</i></Typography>
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
                                    <TextField required name="eventName" onChange={handleChange} variant="standard" placeholder="Type here your eye-catching title" sx={{width: {xs: 300, sm: 450}, pb: 3}}/>
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
                                    <FormControl fullWidth>
                                        <InputLabel id="select">Event Type </InputLabel>
                                        <Select
                                            labelId="select"
                                            value={formData.eventType}
                                            label="Event Type"
                                            name="eventType"
                                            required
                                            onChange={handleChange}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {eventTypes.map((evType, index) => {
                                                return(
                                                    <MenuItem value={evType.eventTypeID} key={index}>{evType.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
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
                                            <Typography>Starts</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    ampm={false}
                                                    minDate={tomorrow}
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
                                            <Typography>Ends</Typography>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDateTimePicker
                                                    ampm={false}
                                                    minDate={tomorrow}
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
                                <Typography>DESCRIBE YOUR EVENT</Typography>
                                <Grid container py={5}>
                                    <TextField
                                        name="description"
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
                                <Typography>CHOOSE LOCATION</Typography>
                                <Grid container py={5}>
                                    <Box display="flex" justifyContent="center" width="100%" pb={4}>
                                        <GoogleAutocomplete onLoad={(autocomplete) => setAutocomplete(autocomplete)}>
                                            <Search>
                                                <SearchIconWrapper>
                                                    <SearchIcon />
                                                </SearchIconWrapper>

                                                <StyledInputBase placeholder="Search…" inputProps={{"aria-label": "search"}}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            if (marker && autocomplete && autocomplete.getPlace())
                                                            {
                                                                marker.setPosition(autocomplete.getPlace().geometry.location);
                                                                map.panTo(autocomplete.getPlace().geometry.location);
                                                                const latLng = marker.getPosition();
                                                                setFormData((prevFormData) => ({
                                                                    ...prevFormData,
                                                                    mapsLat: latLng.lat().toString(),
                                                                    mapsLng: latLng.lng().toString()
                                                                }));
                                                            }
                                                        }
                                                    }}
                                                />
                                            </Search>
                                        </GoogleAutocomplete>
                                    </Box>

                                    <GoogleMap
                                        center={mapCenter}
                                        zoom={15}
                                        mapContainerStyle={{width: "100%", height: "600px"}}
                                        onLoad={(map) => setMap(map)}
                                    >
                                        <Grid item height="50px" position="relative" sx={{mt: 10}}>
                                            <Box position="absolute" bottom="0px" left="0px">
                                                <Button variant="contained" sx={{left: "8%", backgroundColor: "white", color: "black", "&:hover":{backgroundColor: '#FBFBFB'}, pl: 1, pr: 2}} onClick={() => map.panTo(mapCenter)}><NearMeIcon sx={{mr: 1}}/>Recenter</Button>
                                            </Box>
                                        </Grid>
                                        
                                        <MarkerF
                                            position={mapCenter}
                                            onLoad={(marker) => {
                                                setMarker(marker);
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    mapsLat: mapCenter.lat,
                                                    mapsLng: mapCenter.lng
                                                }));
                                            }}
                                        />
                                    </GoogleMap>
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