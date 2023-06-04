import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./home_page.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Navbar from "../../navbar/navbar.js"

const HomePage = () => {
    const navigate = useNavigate();

    return(
        <>
            <Navbar/>
            <Grid container className="container-home-page">
                <Grid item xs={12} sm={7} sx={{pl:{xs: 6, sm: 14}, pr:{xs: 6, sm: 10}}} className="first-grid">
                    <Grid container py={12}>
                        <Grid item xs={12} pb={3}>
                            <span>
                                <Typography className="title">Be Part Of A Beautiful <br></br><span className="community-style">Communit</span>y And Grow Up</Typography><br></br>
                                <Typography pb={5} className="description">In a world full of challenges, always keep learning and discovering, while having fun and connecting with others. <br/> Join one of the biggest communities of students, for free!</Typography>
                            </span>
                        </Grid>
                        <Grid item xs={2}  md={1} className="grid-icon">
                            <KeyboardDoubleArrowRightIcon sx={{fontSize: '40px'}}/>
                        </Grid>
                        <Grid item xs={10}>
                            <Button variant="contained" className="button" onClick={() => {navigate("/signin")}}>Get Started Now</Button> 
                        </Grid>
                    </Grid>
                </Grid>
            <Grid item sm={5} sx={{display: {xs: 'none', sm: 'none', md: 'flex'}}} className="second-grid"></Grid>
        </Grid>
        </>
    );
}

export default HomePage;