import { React, useState } from "react";
import NavbarLoggedIn from "../../navbar_logged/navbar_logged.js";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, InputBase, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EventCard from '../../event_card/event_card.js';
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

const events = [
    {   
        title: 'Taste - Tastic “I Can Cook”',
        image: '',
        enrolled_participants: 3,
        total_participants: 6,
        date: "28 Oct. 2023",
        time: "16:00",
        address: "Victory Square, Timișoara",
        author_lastname: "Chiara",
        author_firstname: "Charlotte - Ava",
        rating: 2.5
    },
    {   
        title: 'Taste - Tastic “I Can Cook”',
        image: '',
        enrolled_participants: 3,
        total_participants: 6,
        date: "28 Oct. 2023",
        time: "16:00",
        address: "Victory Square, Timișoara",
        author_lastname: "Chiara",
        author_firstname: "Charlotte - Ava",
        rating: 2.5
    },
    {   
        title: 'Taste - Tastic “I Can Cook”',
        image: '',
        enrolled_participants: 3,
        total_participants: 6,
        date: "28 Oct. 2023",
        time: "16:00",
        address: "Victory Square, Timișoara",
        author_lastname: "Chiara",
        author_firstname: "Charlotte - Ava",
        rating: 2.5
    }
];

const event_types = ["Cooking", "Games", "Karaoke", "Beauty"];

const Feed = () => {
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
                <FormGroup>
                    {event_types.sort().map((event_type, index) =>{
                        return(
                            <FormControlLabel control={<Checkbox/>} label={event_type} key={index}/>
                        )
                    })}
                </FormGroup>
            </DialogContent>
            <DialogActions p={3}>
                <Box className="dialog-actions">
                    <Button onClick={handleClose} variant="contained">SEE 200 RESULTS</Button>
                </Box>
            </DialogActions>
        </Dialog> 
        </>
    );
}

export default Feed;