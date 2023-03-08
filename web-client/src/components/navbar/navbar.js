import { React } from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';


function ResponsiveAppBar() {

  return (
    <AppBar
        position="sticky"
        elevation={0}
        sx={{backgroundColor: 'transparent', px:{xs: 4, sm: 10}, py:2, color: '#191919'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    sx={{flexGrow: 1, display: 'flex', fontWeight: 700, fontSize: '25px'}}>
                    Univent
                </Typography>
            
                <Button variant="contained">Log In</Button>
            </Toolbar>
        </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;