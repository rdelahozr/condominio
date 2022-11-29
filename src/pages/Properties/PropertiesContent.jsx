import { Box, Breadcrumbs, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { getCondominium } from "../../api/condominium";
import { addProperties, deleteProperties, getPropertiesByCondominium } from "../../api/properties";

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

  const [rows, setRows] = useState([]);

  const newProperty = {
    type: '',
    number: '',
    size: '',
    condominium: ''
  }

  const [newPropertyData, setNewPropertyData] = useState({
    ...newProperty
  });

  const [condominiums, setCondominiums] = useState([]);

  const handleAddProperty = async () => {
    const response = await addProperties(newPropertyData);
    if (response.status === 200) {
      setNewPropertyData({ ...newProperty, condominium: selected })
      getPropertiesByCondominium(selected)
        .then(response => setRows(response.data.map(item => ({
          ...item,
          id: item._id
        }))))
    }
    handleClose();
  }

  const handleDeleteProperty = async (ids) => {
    const response = await deleteProperties(ids);
  }


  useEffect(() => {
    getCondominium()
      .then(response => setCondominiums(response.data))
  }, []);

  useEffect(() => {
    if (selected) {
      getPropertiesByCondominium(selected)
        .then(response => setRows(response.data.map(item => ({
          ...item,
          id: item._id
        }))))
    }
  }, [selected])

  const columns = [
    { field: 'type', headerName: 'Tipo', width: 200, editable: true },
    { field: 'number', headerName: 'Número', width: 130, editable: true },
    {
      field: 'size',
      headerName: 'Tamaño',
      width: 130,
      editable: true,
      valueFormatter: ({ value }) => (`${value} m2`)
    },
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
              handleDeleteProperty(Array.from(selectedIDs));
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
        <Link underline="hover" color="inherit" to="/">
          Inicio
        </Link>
        <Typography color="text.primary">Propiedades</Typography>
      </Breadcrumbs>


      <Typography variant="h5" marginBottom={4}>Propiedades</Typography>
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
                value={newPropertyData.type}
                onChange={(e) => setNewPropertyData(prev => ({ ...prev, type: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Número"
                placeholder="Ingrese número"
                value={newPropertyData.number}
                onChange={(e) => setNewPropertyData(prev => ({ ...prev, number: Number(e.target.value) }))}
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="M2"
                placeholder="Ingrese M2"
                value={newPropertyData.size}
                onChange={(e) => setNewPropertyData(prev => ({ ...prev, size: Number(e.target.value) }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button variant="contained" onClick={handleAddProperty}>Guardar</Button>
              <Button variant="text" onClick={handleClose}>Cancelar</Button>
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
            MenuProps={{
              style: {
                maxHeight: 300,
              },
            }}
            value={selected}
            label="Condominio"
            onChange={(e) => {
              setSelected(e.target.value)
              setNewPropertyData(prev => ({ ...prev, condominium: e.target.value }))
            }}
          >

            {condominiums.length > 0 && condominiums.map(item => (<MenuItem value={item._id}>{item.name}</MenuItem>))}
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