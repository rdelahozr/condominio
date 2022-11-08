import { Box, Breadcrumbs, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

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

const PropertiesContent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selected, setSelected] = useState();

  const [rows, setRows] = useState([
    {
      'id': 1,
      'name': "La Plaza",
      'province': "Independencia",
      'rut': "22.333.444-5",
      'properties': 170,
      'parkings': 30,
      'common-places': 6,
    },
    {
      'id': 2,
      'name': "Edificio Conecta",
      'province': "Providencia",
      'rut': "22.123.444-5",
      'properties': 243,
      'parkings': 22,
      'common-places': 2,
    },
    {
      'id': 3,
      'name': "Colonos",
      'province': "Providencia",
      'rut': "18.123.345-5",
      'properties': 333,
      'parkings': 22,
      'common-places': 20,
    },
    {
      'id': 4,
      'name': "Talaveras 72",
      'province': "Ñuñoa",
      'rut': "22.444.555-5",
      'properties': 234,
      'parkings': 100,
      'common-places': 30,
    },
    {
      'id': 5,
      'name': "Plaza Hotel",
      'province': "Santiago",
      'rut': "22.333.444-5",
      'properties': 50,
      'parkings': 20,
      'common-places': 3,
    },
    {
      'id': 6,
      'name': "La Plaza 2",
      'province': "Independencia",
      'rut': "22.333.444-5",
      'properties': 100,
      'parkings': 30,
      'common-places': 6,
    },
  ]);

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200, editable: true },
    { field: 'province', headerName: 'Comuna', width: 130, editable: true },
    { field: 'rut', headerName: 'Rut', width: 130, editable: true },
    { field: 'properties', headerName: 'Propiedades', width: 130, editable: true },
    { field: 'parkings', headerName: 'Estacionamientos', width: 130, editable: true },
    { field: 'common-places', headerName: 'Áreas Comunes', width: 130, editable: true },
    {
      field: "delete",
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              // you can call an API to delete the selected IDs
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
              setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      }
    }
  ];
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" marginBottom={4}>
        <Link underline="hover" color="inherit" to="/inicio">
          Inicio
        </Link>
        <Typography color="text.primary">Propiedades</Typography>
      </Breadcrumbs>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
            Datos del condominio
          </Typography>
          <Grid direction="row">
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Rut"
                placeholder="Ingrese rut"
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                placeholder="Ingrese nombre"
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Dirección"
                placeholder="Ingrese dirección"
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Comuna"
                placeholder="Ingrese comuna"
              /></Grid>
          </Grid>
        </Box>
      </Modal>

      <Grid xs={12}>
        <Typography variant="h6" marginBottom={2}>Seleccione un condominio</Typography>
        <FormControl sx={{ width: 300, marginBottom: "32px", marginRight: "16px" }} >
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selected}
            label="Condominio"
            onChange={(e) => setSelected(e.target.value)}
          >
            <MenuItem value={1}>La Plaza</MenuItem>
            <MenuItem value={2}>Edificio Conecta</MenuItem>
            <MenuItem value={3}>Colonos</MenuItem>
            <MenuItem value={4}>Talaveras 72</MenuItem>
            <MenuItem value={5}>Plaza Hotel</MenuItem>
            <MenuItem value={6}>La Plaza 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>


      {selected && <Button variant="contained" sx={{ marginBottom: "16px" }} onClick={handleOpen}>Nuevo</Button>}
      {selected && <div style={{ height: 400, width: '100%' }}>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            setSelectionModel(ids);
          }}
          editMode="row"
        />
      </div>}
    </Container>
  )
}

export default PropertiesContent;