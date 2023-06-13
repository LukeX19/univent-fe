import { React, useState, useEffect } from "react";
import NavbarAdmin from "../../navbar_admin/navbar_admin";
import { Box, Button, Grid, Accordion, AccordionSummary, AccordionDetails, DialogContentText, DialogActions, TextField, Paper, Typography, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import { format } from "date-fns";
import { getAllUniversities, getAllEventTypes, addUniversity, updateUniversity, deleteUniversity, addEventType, updateEventType, deleteEventType, getUnapprovedUsers, getUniversityById, approveUserProfile } from "../../../api/index.js";
import "../admin/admin.css";

const Admin = () => {
    const [rowsUniversities, setRowsUniversities] = useState([]);
    useEffect(() => {
        getAllUniversities()
          .then(function (response) {
            const modifiedData = response.data.map((university) => {
              return {
                id: university.universityID,
                name: university.name,
            };
        });
            setRowsUniversities(modifiedData);
        })
          .catch(function (error) {
            console.log(error);
        });
    }, []);

    const [rowsEventTypes, setRowsEventTypes] = useState([]);
    useEffect(() => {
        getAllEventTypes()
          .then(function (response) {
            const modifiedData = response.data.map((eventType) => {
              return {
                id: eventType.eventTypeID,
                name: eventType.name,
                picture: eventType.picture
            };
        });
            setRowsEventTypes(modifiedData);
        })
          .catch(function (error) {
            console.log(error);
        });
    }, []);

    const yearOptions = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'I Master',
        8: 'II Master'
    };
    const [rowsUsers, setRowsUsers] = useState([]);
    useEffect(() => {
        getUnapprovedUsers()
          .then(function (response) {
            const userPromises = response.data.map((userProfile) => {
              return getUniversityById(userProfile.universityID)
                .then(function (universityResponse) {
                  const universityName = universityResponse.data.name;
                  return {
                    id: userProfile.userProfileID,
                    firstname: userProfile.basicInfo.firstName,
                    lastname: userProfile.basicInfo.lastName,
                    university: universityName,
                    year: yearOptions[userProfile.year],
                    emailAddress: userProfile.basicInfo.emailAddress,
                    phoneNumber: userProfile.basicInfo.phoneNumber,
                    dateOfBirth: format(new Date(userProfile.basicInfo.dateOfBirth), "dd.MM.yyyy"),
                    hometown: userProfile.basicInfo.hometown
                  };
                })
                .catch(function (universityError) {
                  console.log("Error getting university:", universityError);
                });
            });
            return Promise.all(userPromises);
          })
          .then(function (modifiedData) {
            setRowsUsers(modifiedData);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);


    const [university, setUniversity] = useState({id: "", name: ""});
    const [eventType, setEventType] = useState({id: "", name: "", picture: ""});
    const [user, setUser] = useState({id: ""});

    const [openAddUniversity, setOpenAddUniversity] = useState(false);
    const [openEditUniversity, setOpenEditUniversity] = useState(false);
    const [openDeleteUniversity, setOpenDeleteUniversity] = useState(false);
    const handleOpenAddUniversity = () => {
        setOpenAddUniversity(true);
    };
    const handleOpenEditUniversity = () => {
        setOpenEditUniversity(true);
    };
    const handleOpenDeleteUniversity = () => {
        setOpenDeleteUniversity(true);
    };

    const [openAddEventType, setOpenAddEventType] = useState(false);
    const [openEditEventType, setOpenEditEventType] = useState(false);
    const [openDeleteEventType, setOpenDeleteEventType] = useState(false);
    const handleOpenAddEventType = () => {
        setOpenAddEventType(true);
    };
    const handleOpenEditEventType= () => {
        setOpenEditEventType(true);
    };
    const handleOpenDeleteEventType = () => {
        setOpenDeleteEventType(true);
    };

    const [openApproveUser, setOpenApproveUser] = useState(false);
    const handleOpenApproveUser = () => {
        setOpenApproveUser(true);
    };

    const handleClose = () => {
        setOpenAddUniversity(false);
        setOpenEditUniversity(false);
        setOpenDeleteUniversity(false);
        setOpenAddEventType(false);
        setOpenEditEventType(false);
        setOpenDeleteEventType(false);
        setOpenApproveUser(false);
    };

    const AddUniversity = () => {
        addUniversity(
            {
                name: university.name
            }
        ).then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    const EditUniversity = (univ) => {
        updateUniversity(univ.id,
            {
                name: univ.name
            }
        ).then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    const DeleteUniversity = (univ) => {
        deleteUniversity(univ.id)
        .then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const AddEventType = () => {
        addEventType(
            {
                name: eventType.name,
                picture: eventType.picture
            }
        ).then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    const EditEventType = (evType) => {
        updateEventType(evType.id,
            {
                name: evType.name,
                picture: evType.picture
            }
        ).then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    const DeleteEventType = (evType) => {
        deleteEventType(evType.id)
        .then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const ApproveUser = (id) => {
        approveUserProfile(id)
        .then(function (response) {
            console.log(response.status);
            handleClose();
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const hiddenColumn = ['id'];

    const columnsUniversities = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name', width: 640, hideable: false},
        {field: 'edit', headerName: '', width: 110, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" 
                            onClick = {() => 
                            {
                                setUniversity({id: cellValues.id, name: cellValues.row.name});
                                handleOpenEditUniversity(); 
                            }}>
                        <EditIcon color="primary"/>
                    </Button>
                )
            }
        },
        {field: 'delete', headerName: '', width: 90, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" onClick = {() => 
                        {
                            setUniversity({id: cellValues.id, name: cellValues.name});
                            handleOpenDeleteUniversity(); 
                        }}>
                        <DeleteIcon sx={{color: '#F15A59'}}/>
                    </Button>
                )
            }
        }
    ];

    function CustomToolbarUniversities(){
        return (
            <GridToolbarContainer>
                <Grid container >
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', py: 1, px: 1}}>
                        <GridToolbarFilterButton/>
                        <Box sx={{marginLeft: 'auto'}}>
                            <Button variant="contained" onClick = {() => {handleOpenAddUniversity(); setUniversity({id: '', name: ''});}}>ADD</Button>
                        </Box>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        )
    };

    const filteredColumnsUniversities = columnsUniversities.filter((column) => !hiddenColumn.includes(column.field));


    const columnsEventTypes = [
        {field: 'id', headerName: 'ID'},
        {field: 'name', headerName: 'Name', width: 300, hideable: false},
        {field: 'picture', headerName: 'Picture', width: 340},
        {field: 'edit', headerName: '', width: 110, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" 
                            onClick = {() => 
                            {
                                setEventType({id: cellValues.id, name: cellValues.row.name, picture: cellValues.row.picture});
                                handleOpenEditEventType(); 
                            }}>
                        <EditIcon color="primary"/>
                    </Button>
                )
            }
        },
        {field: 'delete', headerName: '', width: 90, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" onClick = {() => 
                        {
                            setEventType({id: cellValues.id, name: cellValues.name, picture: cellValues.picture});
                            handleOpenDeleteEventType(); 
                        }}>
                        <DeleteIcon sx={{color: '#F15A59'}}/>
                    </Button>
                )
            }
        }
    ];

    function CustomToolbarEventTypes(){
        return (
            <GridToolbarContainer>
                <Grid container >
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', py: 1, px: 1}}>
                        <GridToolbarFilterButton/>
                        <Box sx={{marginLeft: 'auto'}}>
                            <Button variant="contained" onClick = {() => {handleOpenAddEventType(); setEventType({id: '', name: '', picture: ''});}}>ADD</Button>
                        </Box>
                    </Grid>
                </Grid>
            </GridToolbarContainer>
        )
    };

    const filteredColumnsEventTypes = columnsEventTypes.filter((column) => !hiddenColumn.includes(column.field));


    const columnsUsers = [
        {field: 'id', headerName: 'ID'},
        {field: 'firstname', headerName: 'First Name', width: 160, hideable: false},
        {field: 'lastname', headerName: 'Last Name', width: 160, hideable: false},
        {field: 'university', headerName: 'University', width: 200, hideable: false},
        {field: 'year', headerName: 'Year', width: 100, hideable: false},
        {field: 'emailAddress', headerName: 'Email', width: 240, hideable: false},
        {field: 'phoneNumber', headerName: 'Phone Number', width: 150, hideable: false},
        {field: 'dateOfBirth', headerName: 'Date of birth', width: 120, hideable: false},
        {field: 'hometown', headerName: 'Hometown', width: 150, hideable: false},
        {field: 'approve', headerName: '', width: 110, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" onClick = {() => 
                        {
                            setUser({id: cellValues.id});
                            handleOpenApproveUser(); 
                        }}>
                        <VerifiedIcon sx={{color: '#1B9C85'}}/>
                    </Button>
                )
            }
        },
    ];

    function CustomToolbarUsers(){
        return (
            <GridToolbarContainer>
                <GridToolbarFilterButton/>
            </GridToolbarContainer>
        )
    };

    const filteredColumnsUsers = columnsUsers.filter((column) => !hiddenColumn.includes(column.field));


    return(
        <>
            <NavbarAdmin/>
            <Grid container className="container-admin">
                <Paper elevation={5} className="paper">
                    <Grid container>
                        <Grid item xs={12} pb={6}>
                            <Typography className="title">Dashboard</Typography>
                        </Grid>
                       
                        <Grid item xs={12} py={1}>
                            <Accordion defaultExpanded={false} sx={{width: '100%'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                    <Typography>Universities</Typography>
                                </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{height: 500, width: '100%'}}>
                                            <DataGrid 
                                                columns={filteredColumnsUniversities}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={rowsUniversities}
                                                components={{Toolbar: CustomToolbarUniversities}}
                                            />
                                        </div>
                                    </AccordionDetails>
                            </Accordion>
                        </Grid>
                       
                        <Grid item xs={12} py={1}>
                            <Accordion defaultExpanded={false} sx={{width: '100%'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                    <Typography>Event Types</Typography>
                                </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{height: 500, width: '100%'}}>
                                            <DataGrid 
                                                columns={filteredColumnsEventTypes}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={rowsEventTypes}
                                                components={{Toolbar: CustomToolbarEventTypes}}
                                            />
                                        </div>
                                    </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} py={1}>
                            <Accordion defaultExpanded={false} sx={{width: '100%'}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} sx={{background: '#EEEEEE'}}>
                                    <Typography>Pending Users</Typography>
                                </AccordionSummary>
                                    <AccordionDetails>
                                        <div style={{height: 500, width: '100%'}}>
                                            <DataGrid 
                                                columns={filteredColumnsUsers}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                rows={rowsUsers}
                                                components={{Toolbar: CustomToolbarUsers}}
                                            />
                                        </div>
                                    </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Dialog open={openAddUniversity} onClose={handleClose}>
                <DialogTitle>Add New University</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter the name here
                    </DialogContentText>
                    <TextField
                        onChange={(event) => {setUniversity({...university, id: "", name: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    /> 
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "#68B984", color: "#FBFBFB", "&:hover": {background: "#68B984"}}} onClick={AddUniversity}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditUniversity} onClose={handleClose}>
                <DialogTitle>Edit University</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter a new name here
                    </DialogContentText>
                    <TextField
                        value={university.name}
                        onChange={(event) => {setUniversity({...university, name: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    /> 
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "#68B984", color: "#FBFBFB", "&:hover": {background: "#68B984"}}} onClick={() => {EditUniversity(university)}}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteUniversity} onClose={handleClose}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Are you sure you want to remove this University?
                        <br/>
                        This action cannot be undone. Existing profiles for users currently enrolled in this university and all events created by them will be permanently deleted!
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "red", color: "#FBFBFB", "&:hover": {background: "red"}}} onClick={() => {DeleteUniversity(university)}}>CONFIRM</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddEventType} onClose={handleClose}>
                <DialogTitle>Add New Event Type</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter the name here
                    </DialogContentText>
                    <TextField
                        onChange={(event) => {setEventType({...eventType, id: "", name: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <DialogContentText pt={4}>
                        Please add in the images folder the desired image. After that, enter the name of the picture with its extension.
                        Example: "man.jpg"
                    </DialogContentText>
                    <TextField
                        onChange={(event) => {setEventType({...eventType, id: "", picture: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "#68B984", color: "#FBFBFB", "&:hover": {background: "#68B984"}}} onClick={AddEventType}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditEventType} onClose={handleClose}>
                <DialogTitle>Edit Event Type</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter a new name here
                    </DialogContentText>
                    <TextField
                        value={eventType.name}
                        onChange={(event) => {setEventType({...eventType, name: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                    <DialogContentText pt={4}>
                        Please add in the images folder the desired image. After that, enter the name of the picture with its extension.
                        Example: "man.jpg"
                    </DialogContentText>
                    <TextField
                        value={eventType.picture}
                        onChange={(event) => {setEventType({...eventType, picture: event.target.value})}}
                        autoFocus
                        type="text"
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        size="small"
                    />
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "#68B984", color: "#FBFBFB", "&:hover": {background: "#68B984"}}} onClick={() => {EditEventType(eventType)}}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteEventType} onClose={handleClose}>
                <DialogTitle>Warning</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Are you sure you want to remove this Event Type?
                        <br/>
                        This action cannot be undone and existing events, along with their participant lists, will be permanently deleted!
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "red", color: "#FBFBFB", "&:hover": {background: "red"}}} onClick={() => {DeleteEventType(eventType)}}>Confirm</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openApproveUser} onClose={handleClose}>
                <DialogTitle>Approve User</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Are you sure you want to approve this account to the platform?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{padding: "15px"}}>
                    <Button sx={{background: "#68B984", color: "#FBFBFB", "&:hover": {background: "#68B984"}}} onClick={() => {ApproveUser(user.id)}}>Confirm</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default Admin;