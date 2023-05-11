import { React, useState, useEffect } from "react";
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, InputBase, Radio, RadioGroup, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EventCard from '../../event_card/event_card.js';
import { getAllEventTypes, getAllEvents } from "../../../api/index.js";
import "../feed/feed.css";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #7B8FA1',
    width: '100%',
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7B8FA1'
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    },
}));

const Feed = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const [eventTypes, setEventTypes] = useState([]);
    useEffect(() => {
        getAllEventTypes().then(function (response) {
            setEventTypes(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const [events, setEvents] = useState([]);
    useEffect(() => {
        getAllEvents().then(function (response) {
            setEvents(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const [results, setResults] = useState(0);
    const handleChange = (event) => {
        if(event.target.checked)
        {
            const eventTypeID = event.target.value;
            let count = 0;
            events.reduce((filtered, event) => {
                if (event.eventTypeID === eventTypeID) 
                {
                    count++;
                    filtered.push(event);
                }
                return filtered;
            }, []);
            setResults(count);
        }
    };

    return(
        <>
        <NavbarLoggedIn/>
        <Grid container className="container-feed">
            <Grid container className="container">
                <Grid item mr={2}>
                    <Button onClick={handleOpen} height="40px" variant="contained"><TuneIcon/></Button>
                </Grid>
                <Grid item flexGrow={1}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{"aria-label": "search"}}/>
                    </Search>
                </Grid>
                {events.map((ev, index) => {
                    return(
                        <Grid item xs={12} className="event-grid" key={index}>
                            <EventCard event={ev}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
        <Dialog className="dialog-feed" scroll={"paper"} onClose={handleClose} open={open} TransitionComponent={Slide} TransitionProps={{direction: 'up', timeout: {enter: 600, exit: 300}}}>
            <DialogTitle>Filter by Event Type
                <IconButton onClick={handleClose} sx={{position: "absolute", right: 9, top: 10}}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="dialog-content" dividers={true}>
                <RadioGroup>
                    {eventTypes.map((event_type, index) =>{
                        return(
                            <FormControlLabel value={event_type.eventTypeID} control={<Radio/>} label={event_type.name} key={index} onChange={handleChange}/>
                        )
                    })}
                </RadioGroup>
            </DialogContent>
            <DialogActions p={3}>
                <Box className="dialog-actions">
                    {results > 0 && (
                        <Button onClick={handleClose} variant="contained">
                        {results > 1 ? `SEE ${results} RESULTS` : `SEE ${results} RESULT`}
                        </Button>
                    )}
                </Box>
            </DialogActions>
        </Dialog> 
        </>
    );
}

export default Feed;