import { React, useState, useEffect } from "react";
import { AppBar, Avatar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUserProfileById } from "../../api";
import "./navbar_logged.css"

const pages = [
    {name: "Explore Events", link: "/feed"},
    {name: "Host a New Event", link: "/create-event"}
];
const settings = [
    {name: "Profile", icon: <AccountCircleIcon/>, link: "/profile"},
    {name: "Logout", icon: <LogoutIcon/>, link: "/"}
];

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const [userInfo, setUserInfo] = useState({});
    const decoded_token = jwt_decode(localStorage.getItem("token"));
    useEffect(() => {
        getUserProfileById(decoded_token.UserProfileId).then(function (response) {
            setUserInfo(response.data.basicInfo);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{backgroundColor: 'white', px:{xs: 4, sm: 10}, py: 1, height: '11vh', color: '#191919'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        sx={{flexGrow: 1, display: { xs: 'none', md: 'flex' }, fontWeight: 700, fontSize: '25px', cursor: 'pointer'}}
                        onClick={()=>{navigate("/")}}>
                        Univent
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        { pages.map((page, index) => (
                        <Button
                            key={index}
                            onClick={() => {navigate(page.link)}}
                            id = {window.location.pathname.match(page.link)? "active" : ""}
                            sx={{ px: 3, my: 2, color: 'black', display: 'block' }}
                        >
                            {page.name}
                        </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        { pages.map((page, index) => (
                            <MenuItem key={index} onClick={() => {navigate(page.link)}}>
                            <Typography textAlign="center">{page.name}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>

                    <Typography
                        sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: 700, fontSize: '25px'}}>
                        Univent
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {
                                    userInfo.profilePicture !== "" ?
                                    (
                                        <Avatar src={userInfo.profilePicture}/>
                                    )
                                    :
                                    (
                                        <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}}>
                                            {userInfo.lastName.charAt(0)}
                                            {userInfo.firstName.charAt(0)}
                                        </Avatar>
                                    )
                                }
                            </IconButton>
                        </Tooltip>

                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            { settings.map((setting, index) => (
                                <MenuItem key={index} onClick={setting.name === "Logout" ? handleLogout : () => navigate(setting.link)}>
                                    <ListItemIcon>{setting.icon}</ListItemIcon>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;