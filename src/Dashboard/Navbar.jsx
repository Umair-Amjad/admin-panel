import  React,{useCallback, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useDispatch } from 'react-redux';
import { logout } from "../Slices/Login";
import { Divider, ListItemIcon, ListItemText, Popover } from '@mui/material';
import CogIcon from '../icons/Cog';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import { Link as RouterLink, useNavigate } from 'react-router-dom';
function ResponsiveAppBar({ handleDrawerOpen,opens }) {
    const anchorRef = React.useRef(null);
    const dispatch=useDispatch()
    const [anchorElNav, setAnchorElNav] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    //  const users = window.localStorage.getItem("user");
    //  const users1 = JSON.parse(users);
    console.log();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // const handleLogout = async () => {
    //     try {
    //         // handleClose();
    //         await dispatch(logout());
    //         navigate('/');
    //     } catch (err) {
    //         console.error(err);
    //         toast.error('Unable to logout.');
    //     }
    // };
    const handleLogout = useCallback(() => {
        dispatch(logout());
        setOpen(false);
        navigate('/login');
    }, [dispatch]);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

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
                      
                        <Popover
                            anchorEl={anchorRef.current}
                            anchorOrigin={{
                                horizontal: "center",
                                vertical: "bottom",
                            }}
                            keepMounted
                            onClose={handleCloseNavMenu}
                            open={anchorElNav}
                            PaperProps={{
                                sx: { width: 240 },
                            }}
                        >
                            
                            <Divider />
                            <Box sx={{ mt: 2 }}>
                                <MenuItem component={RouterLink} to="/dashboard/social/profile">
                                    <ListItemIcon>
                                        <CogIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography color="textPrimary" variant="subtitle2">
                                                Profile
                                            </Typography>
                                        }
                                    />
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/dashboard/account">
                                    <ListItemIcon>
                                        <CogIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography color="textPrimary" variant="subtitle2">
                                                Settings
                                            </Typography>
                                        }
                                    />
                                </MenuItem>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    color="primary"
                                    fullWidth
                                    onClick={handleLogout}
                                    variant="outlined"
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Popover>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                       
                        <Popover
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                horizontal: "center",
                                vertical: "bottom",
                            }}
                            keepMounted
                            onClose={handleCloseUserMenu}
                            open={Boolean(anchorElUser)}
                            PaperProps={{
                                sx: { width: 240 },
                            }}
                        >

                            <Divider />
                            <Box sx={{ mt: 2 }}>
                                <MenuItem component={RouterLink} to="/dashboard/social/profile">
                                    <ListItemIcon>
                                        <CogIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography color="textPrimary" variant="subtitle2">
                                                Profile
                                            </Typography>
                                        }
                                    />
                                </MenuItem>
                                <MenuItem component={RouterLink} to="/dashboard/account">
                                    <ListItemIcon>
                                        <CogIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography color="textPrimary" variant="subtitle2">
                                                Settings
                                            </Typography>
                                        }
                                    />
                                </MenuItem>
                            </Box>
                            <Box sx={{ p: 2 }}>
                                <Button
                                    color="primary"
                                    fullWidth
                                    onClick={handleLogout}
                                    variant="outlined"
                                >
                                    Logout
                                </Button>
                            </Box>
                        </Popover>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
