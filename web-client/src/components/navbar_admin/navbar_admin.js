import { React } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function NavbarAdmin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{background: 'white', px: 10, py: 1, height: '11vh', color: '#191919'}}
        >
             <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        sx={{flexGrow: 1, display: 'flex', fontWeight: 700, fontSize: '25px', cursor: 'pointer'}}
                        onClick={()=>{navigate("/")}}
                    >
                        Univent
                    </Typography>

                    <AdminPanelSettingsIcon sx={{fontSize: '1.8rem', display: {xs: 'none', md: 'flex'}}}/>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Typography sx={{fontSize: '22px', pl: 1}}>Administrator</Typography>
                    </Box>

                    <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={handleLogout}>
                        <LogoutIcon sx={{fontSize: '1.4rem'}}/>
                        <Typography sx={{fontSize: '20px', pl: 1}}>Logout</Typography>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavbarAdmin;