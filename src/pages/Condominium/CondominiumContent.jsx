import { Breadcrumbs, Button, Grid, IconButton, Modal, TableCell, TableContainer, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { addCondominium, deleteCondominiums, getCondominium } from "../../api/condominium";

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

const CondominiumContent = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // cargarlos desde la api
  const [rows, setRows] = useState([]);

  const newCondominium = {
    rut: '',
    name: '',
    address: '',
    province: '',
    properties: 0,
    parkings: 0,
    commonPlaces: 0,
  }

  const [selectionModel, setSelectionModel] = useState([]);

  const [newCondominiumData, setNewCondimiumData] = useState({
    ...newCondominium
  });

  const [addCondominiumResponse, setAddCondominiumResponse] = useState();

  const handleAddCondominium = async () => {
    const response = await addCondominium(newCondominiumData);
    setAddCondominiumResponse(response);
    setNewCondimiumData({ ...newCondominium })
    handleClose();
  }

  const handleRemoveCondominium = async (ids) => {
    console.log(ids);
    const response = await deleteCondominiums(ids)
  }

  useEffect(() => {
    console.log(addCondominiumResponse);
    getCondominium()
      .then(response => setRows(response.data.map(item => (
        { ...item, id: item._id }
      ))))
  }, [addCondominiumResponse]);

  const columns = [
    { field: 'name', headerName: 'Nombre', width: 200, editable: true },
    { field: 'province', headerName: 'Comuna', width: 130, editable: true },
    { field: 'rut', headerName: 'Rut', width: 130, editable: true },
    { field: 'properties', headerName: 'Propiedades', width: 130, editable: true },
    { field: 'parkings', headerName: 'Estacionamientos', width: 130, editable: true },
    { field: 'commonPlaces', headerName: 'Áreas Comunes', width: 130, editable: true },
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
              handleRemoveCondominium(Array.from(selectedIDs));
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
        <Typography color="text.primary">Condominio</Typography>
      </Breadcrumbs>
      <Button variant="contained" sx={{ marginBottom: "16px" }} onClick={handleOpen}>Nuevo</Button>

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
                value={newCondominiumData.rut}
                onChange={(e) => setNewCondimiumData(prev => ({ ...prev, rut: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Nombre"
                placeholder="Ingrese nombre"
                value={newCondominiumData.name}
                onChange={(e) => setNewCondimiumData(prev => ({ ...prev, name: e.target.value }))}
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Dirección"
                placeholder="Ingrese dirección"
                value={newCondominiumData.address}
                onChange={(e) => setNewCondimiumData(prev => ({ ...prev, address: e.target.value }))}
              /></Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Comuna"
                placeholder="Ingrese comuna"
                value={newCondominiumData.province}
                onChange={(e) => setNewCondimiumData(prev => ({ ...prev, province: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Propiedades"
                placeholder="Ingrese número de propiedades"
                value={newCondominiumData.properties}
                onChange={(e) => setNewCondimiumData(prev => ({ ...prev, properties: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button variant="contained" onClick={handleAddCondominium}>Guardar</Button>
              <Button variant="text" onClick={handleClose}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <div style={{ height: 400, width: '100%' }}>
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
      </div>
    </Container>
  )
}

export default CondominiumContent;