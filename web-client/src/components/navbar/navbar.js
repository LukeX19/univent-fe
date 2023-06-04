import { React } from "react";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ResponsiveAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar
        elevation={0}
        sx={{backgroundColor: 'transparent', px:{xs: 4, sm: 10}, py:2, color: '#191919'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    sx={{flexGrow: 1, fontFamily: "'Permanent Marker', cursive", display: 'flex', fontWeight: 700, fontSize: '30px'}}>
                    Univent
                </Typography>
            
            </Toolbar>
        </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;