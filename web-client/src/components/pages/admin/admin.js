import { React, useState, useEffect } from "react";
import NavbarAdmin from "../../navbar_admin/navbar_admin";
import { Box, Button, Grid, Accordion, AccordionSummary, AccordionDetails, DialogContentText, DialogActions, TextField, Paper, Typography, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from "@mui/x-data-grid";
import { getAllUniversities, getAllEventTypes, addUniversity, updateUniversity, deleteUniversity, addEventType, updateEventType, deleteEventType } from "../../../api/index.js";
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
            };
        });
            setRowsEventTypes(modifiedData);
        })
          .catch(function (error) {
            console.log(error);
        });
    }, []);

    const [university, setUniversity] = useState({id: "", name: ""});
    const [eventType, setEventType] = useState({id: "", name: ""});

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

    const handleClose = () => {
        setOpenAddUniversity(false);
        setOpenEditUniversity(false);
        setOpenDeleteUniversity(false);
        setOpenAddEventType(false);
        setOpenEditEventType(false);
        setOpenDeleteEventType(false);
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
                name: eventType.name
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
                name: evType.name
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
        {field: 'name', headerName: 'Name', width: 640, hideable: false},
        {field: 'edit', headerName: '', width: 110, sortable: false, filterable: false, hideable: false,
            renderCell: (cellValues) => {
                return (
                    <Button size="small" 
                            onClick = {() => 
                            {
                                setEventType({id: cellValues.id, name: cellValues.row.name});
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
                            setEventType({id: cellValues.id, name: cellValues.name});
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
                            <Button variant="contained" onClick = {() => {handleOpenAddEventType(); setEventType({id: '', name: ''});}}>ADD</Button>
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
                    <Button size="small"><VerifiedIcon sx={{color: '#1B9C85'}}/></Button>
                )
            }
        },
    ];

    const rowsUsers = [
        {id: 'D9D5760F-9B25-4631-CE23-0Sd8DB5137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0dF8DB5137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: 'Master II', emailAddress: 'catalin.secosan@student.upt.ro', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8GDB5137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DTB5137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DBH5137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB5J137F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB51M37F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB513K7F81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB5137IF81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB5137FO81C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Targul - Ocna de Sus'},
        {id: 'D9D5760F-9B25-4631-CE23-0d8DB5137F8P1C', firstname: 'Ionel', lastname: 'Popescu', university: 'Universitatea de Vest', year: '3', emailAddress: 'popescu.ionel@gmail.com', phoneNumber: '0712345678', dateOfBirth: '20/12/2001', hometown: 'Cluj-Napoca'},
       
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
                            <Accordion defaultExpanded={true} sx={{width: '100%'}}>
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
                            <Accordion defaultExpanded={true} sx={{width: '100%'}}>
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
                            <Accordion defaultExpanded={true} sx={{width: '100%'}}>
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
                        Add new university here
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
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={AddUniversity}>SAVE</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditUniversity} onClose={handleClose}>
                <DialogTitle>Edit University</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter new name here
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
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {EditUniversity(university)}}>SAVE</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteUniversity} onClose={handleClose}>
                <DialogTitle>Delete University</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {DeleteUniversity(university)}}>CONFIRM</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddEventType} onClose={handleClose}>
                <DialogTitle>Add New Event Type</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Add new Event Type here
                    </DialogContentText>
                    <TextField 
                        onChange={(event) => {setEventType({...eventType, name: event.target.value})}} 
                        autoFocus 
                        type="text" 
                        margin="dense" 
                        fullWidth 
                        variant="outlined" 
                        size="small"
                    /> 
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={AddEventType}>SAVE</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditEventType} onClose={handleClose}>
                <DialogTitle>Edit Event Type</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Enter new event type here
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {EditEventType(eventType)}}>SAVE</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteEventType} onClose={handleClose}>
                <DialogTitle>Delete Event Type</DialogTitle>
                <DialogContent sx={{width: '500px'}}>
                    <DialogContentText>
                        Are you sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {DeleteEventType(eventType)}}>CONFIRM</Button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default Admin;