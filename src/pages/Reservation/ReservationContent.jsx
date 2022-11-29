import { Box, Breadcrumbs, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCommonPlacesByCondominium } from "../../api/commonPlaces";
import { getCondominium } from "../../api/condominium";
import { addReservation, getReservationsByCondominium } from "../../api/reservations";
import { addUser, getUsers } from "../../api/users";
import { useUserContext } from "../../context/userContext";
import { roles } from "../../utils/helpers";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0px',
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const ReservationContent = () => {
  const { user } = useUserContext();
  const [users, setUsers] = useState();
  const [places, setPlaces] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newUser = {
    place: '',
    condominium: user.condominium,
    date: ''
  }

  const [newUserData, setNewUserData] = useState({
    ...newUser
  });

  useEffect(() => {

    if (user.condominium) {
      getCommonPlacesByCondominium(user.condominium)
        .then(response => setPlaces(response.data.map(item => ({
          ...item,
          id: item._id
        }))))
    }
  }, [user.condominium])

  useEffect(() => {
    getReservationsByCondominium(user.condominium)
      .then(response => setUsers(response.data))
  }, [user.condominium]);

  const handleAddUser = async () => {
    const response = await addReservation({
      ...newUserData,
      condominium: user.condominium
    });
    getReservationsByCondominium(user.condominium)
      .then(response => setUsers(response.data))
    handleClose();
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
            Datos de la reserva
          </Typography>
          <Grid direction="row">
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Fecha"
                placeholder="Ingrese Fecha"
                value={newUserData.date}
                onChange={(e) => setNewUserData(prev => ({ ...prev, date: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <FormControl sx={{ width: "200px" }} >
                <InputLabel id="demo-simple-select-label2">Lugar</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  value={newUserData.place}
                  label="Lugar"
                  onChange={(e) => {
                    setNewUserData(prev => ({ ...prev, place: e.target.value }))
                  }}
                >

                  {
                    places && places.map(item => (<MenuItem value={item.name}>{item.name}</MenuItem>))

                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button variant="contained" onClick={handleAddUser}>Guardar</Button>
              <Button variant="text" onClick={handleClose}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Breadcrumbs aria-label="breadcrumb" marginBottom={4}>
        <Link underline="hover" color="inherit" to="/">
          Inicio
        </Link>
        <Typography color="text.primary">Reservas</Typography>
      </Breadcrumbs>
      <Typography variant="h5" marginBottom={4}>Reservas</Typography>
      <Button variant="contained" sx={{ marginBottom: "16px" }} onClick={handleOpen}>Nuevo</Button>
      <TableContainer component={Paper} marginTop={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="p">Nombre</Typography></TableCell>
              <TableCell><Typography variant="p">Correo</Typography></TableCell>
              <TableCell><Typography variant="p">Rol</Typography></TableCell>
              <TableCell><Typography variant="p">Acciones</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users && users.map(user => (
                <TableRow>
                  <TableCell><Typography variant="p">{user.name}</Typography></TableCell>
                  <TableCell><Typography variant="p">{user.email}</Typography></TableCell>
                  <TableCell><Typography variant="p">{user.role}</Typography></TableCell>
                  <TableCell>

                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default ReservationContent;