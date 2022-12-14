import { Box, Breadcrumbs, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCondominium } from "../../api/condominium";
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

const UsersContent = () => {
  const { user } = useUserContext();
  const [selected, setSelected] = useState(user?.role !== roles.SUPER_ADMIN ? user?.condominium : null);
  const [condominiums, setCondominiums] = useState([]);
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newUser = {
    name: '',
    role: '',
    email: '',
    username: '',
    password: '',
    condominium: ''
  }

  const [newUserData, setNewUserData] = useState({
    ...newUser
  });

  useEffect(() => {
    console.log({ user })
    getCondominium()
      .then(response => setCondominiums(response.data))
  }, []);

  useEffect(() => {
    getUsers(selected)
      .then(response => setUsers(response.data))
  }, [selected]);

  const handleAddUser = async () => {
    const response = await addUser({
      ...newUserData,
      condominium: selected
    });
    getUsers(selected)
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
            Datos del usuario
          </Typography>
          <Grid direction="row">
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                placeholder="Ingrese Nombre"
                value={newUserData.name}
                onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder="Ingrese Email"
                value={newUserData.email}
                onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <FormControl sx={{ width: "200px" }} >
                <InputLabel id="demo-simple-select-label2">Rol</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  value={newUserData.role}
                  label="Rol"
                  onChange={(e) => {
                    setNewUserData(prev => ({ ...prev, role: e.target.value }))
                  }}
                >

                  {user?.role === roles.SUPER_ADMIN ?
                    Object.values(roles).map(item => (<MenuItem value={item}>{item}</MenuItem>))
                    : <MenuItem value={roles.RESIDENT}>{roles.RESIDENT}</MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Username"
                placeholder="Ingrese usuario"
                value={newUserData.username}
                onChange={(e) => setNewUserData(prev => ({ ...prev, username: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                placeholder="Ingrese password"
                value={newUserData.password}
                onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
              />
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
        <Typography color="text.primary">Usuarios</Typography>
      </Breadcrumbs>
      <Typography variant="h5" marginBottom={4}>Usuarios</Typography>

      <Grid xs={12}>
        <Typography variant="h6" marginBottom={2}>Seleccione un condominio</Typography>
        <FormControl sx={{ width: 300, marginBottom: "32px", marginRight: "16px" }} >
          <InputLabel id="demo-simple-select-label">Condominio</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            MenuProps={{
              style: {
                maxHeight: 300,
              },
            }}
            value={selected}
            label="Condominio"
            onChange={(e) => {
              setSelected(e.target.value)
            }}
            disabled={user?.role !== roles.SUPER_ADMIN}
          >

            {condominiums.length > 0 && condominiums.map(item => (<MenuItem value={item._id}>{item.name}</MenuItem>))}
          </Select>
        </FormControl>
      </Grid>
      {selected && <Button variant="contained" sx={{ marginBottom: "16px" }} onClick={handleOpen}>Nuevo</Button>}
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

export default UsersContent;