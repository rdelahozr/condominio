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
      'type': "Estacionamiento",
      'number': "22",
      'size': "6m2",
    },
    {
      'id': 2,
      'type': "Departamento",
      'number': "201",
      'size': "22m2",
    },
    {
      'id': 3,
      'type': "Departamento",
      'number': "301",
      'size': "32m2",
    },
    {
      'id': 4,
      'type': "Departamento",
      'number': "401",
      'size': "42m2",
    },
    {
      'id': 5,
      'type': "Estacionamiento",
      'number': "23",
      'size': "4m2",
    },
    {
      'id': 6,
      'type': "Estacionamiento",
      'number': "24",
      'size': "6m2",
    },
    {
      'id': 7,
      'type': "Estacionamiento",
      'number': "25",
      'size': "6m2",
    },

  ]);

  const columns = [
    { field: 'type', headerName: 'Tipo', width: 200, editable: true },
    { field: 'number', headerName: 'Número', width: 130, editable: true },
    { field: 'size', headerName: 'Tamaño', width: 130, editable: true },
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
            Datos de la propiedad
          </Typography>
          <Grid direction="row">
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Tipo"
                placeholder="Ingrese tipo"
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Número"
                placeholder="Ingrese número"
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="M2"
                placeholder="Ingrese M2"
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button variant="contained">Guardar</Button>
              <Button variant="text">Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Grid xs={12}>
        <Typography variant="h6" marginBottom={2}>Seleccione un condominio</Typography>
        <FormControl sx={{ width: 300, marginBottom: "32px", marginRight: "16px" }} >
          <InputLabel id="demo-simple-select-label">Condominio</InputLabel>
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