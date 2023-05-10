import { React, useState, useEffect } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction } from '../../actions/userProfiles'

const pages = ['Explore Events', 'Host a New Event', 'My Events'];
const settings = [
    {name: 'Profile', icon: <AccountCircleIcon/>},
    {name: 'Account', icon: <SettingsIcon/>},
    {name: 'Logout', icon: <LogoutIcon/>}
];

function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const userProfileFromDB = useSelector(state => state.userProfiles);
    const decoded_token = jwt_decode(localStorage.getItem("token"));

    useEffect(() => {
        dispatch(getUserProfileAction(decoded_token.UserProfileId))
    }, [dispatch]);

    console.log(userProfileFromDB);


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
                        {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ px: 3, my: 2, color: 'black', display: 'block' }}
                        >
                            {page}
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
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
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
                                    userProfileFromDB && userProfileFromDB.basicInfo && userProfileFromDB.basicInfo.profilePicture !== undefined ?
                                    (
                                        userProfileFromDB.basicInfo.profilePicture !== "" ?
                                        (
                                            <Avatar src={userProfileFromDB.basicInfo.profilePicture}/>
                                        )
                                        :
                                        (
                                            <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] }}}>
                                                {userProfileFromDB.basicInfo.lastName.charAt(0)}
                                                {userProfileFromDB.basicInfo.firstName.charAt(0)}
                                            </Avatar>
                                        )
                                    )
                                    :
                                    (
                                        <Avatar sx={{ bgcolor: deepOrange[500], "&:hover": { bgcolor: deepOrange[900] } }}/>
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
                            {settings.map((setting, index) => (
                                <MenuItem key={index} onClick={handleCloseUserMenu}>
                                    <ListItemIcon>{setting.icon}</ListItemIcon>
                                    
                                    <Typography textAlign="center" sx={{ px: 1 }}>{setting.name}</Typography>
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