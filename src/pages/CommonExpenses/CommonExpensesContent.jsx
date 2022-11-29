import { Box, Breadcrumbs, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserContext } from "../../context/userContext";
import { roles } from "../../utils/helpers";
import { addExpense, getExpensesByCondominium } from "../../api/expenses";
import { getPropertiesByCondominium } from "../../api/properties";
import { getCondominium } from "../../api/condominium";

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

const CommonExpensesContent = () => {
  const { user } = useUserContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selected, setSelected] = useState(user?.role !== roles.SUPER_ADMIN ? user?.condominium : null);
  const [expenses, setExpenses] = useState();
  const [appartments, setAppartments] = useState();
  const [condominiums, setCondominiums] = useState();
  const newExpense = {
    amount: '',
    appartment: '',
    year: '',
    month: '',
    dueDate: '',
    condominium: '',
    status: ''
  }

  const [newExpenseData, setNewExpenseData] = useState({
    ...newExpense
  });

  const handleGetData = () => {
    if (user.role === roles.SUPER_ADMIN && selected) {
      getExpensesByCondominium(selected)
        .then(response => setExpenses(response.data))
      getPropertiesByCondominium(selected)
        .then(response => setAppartments(response.data))
    }

    if (user.role === roles.ADMIN || user.role === roles.DIRECTIVE) {
      getExpensesByCondominium(user.condominium)
        .then(response => setExpenses(response.data))
      getPropertiesByCondominium(user.condominium)
        .then(response => setAppartments(response.data))
    }
  }

  useEffect(() => {
    handleGetData();
  }, [user, selected])

  useEffect(() => {
    getCondominium()
      .then(response => setCondominiums(response.data))
  }, []);

  const handleAddExpense = async () => {
    const response = await addExpense({
      ...newExpenseData,
      condominium: selected
    });
    handleClose();
    handleGetData();
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
            Nuevo Gasto Común
          </Typography>
          <Grid direction="row">
            <Grid item xs={12} marginBottom={2}>
              <FormControl sx={{ width: "200px" }} >
                <InputLabel id="demo-simple-select-label2">Departamento</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  value={newExpenseData.appartment}
                  label="Departamento"
                  onChange={(e) => {
                    setNewExpenseData(prev => ({ ...prev, appartment: e.target.value }))
                  }}
                >

                  {appartments && appartments.filter(d => d.type === 'Departamento').map(item => (<MenuItem value={item._id}>{item.number}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Monto"
                placeholder="Ingrese monto"
                value={newExpenseData.amount}
                onChange={(e) => setNewExpenseData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Año"
                placeholder="Ingrese año"
                value={newExpenseData.year}
                onChange={(e) => setNewExpenseData(prev => ({ ...prev, year: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Mes"
                placeholder="Ingrese mes"
                value={newExpenseData.month}
                onChange={(e) => setNewExpenseData(prev => ({ ...prev, month: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <TextField
                required
                id="outlined-required"
                label="Vencimiento"
                placeholder="Ingrese vencimiento"
                value={newExpenseData.dueDate}
                onChange={(e) => setNewExpenseData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <FormControl sx={{ width: "200px" }} >
                <InputLabel id="demo-simple-select-label3">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select3"
                  value={newExpenseData.status}
                  label="Estado"
                  onChange={(e) => {
                    setNewExpenseData(prev => ({ ...prev, status: e.target.value }))
                  }}
                >

                  {['Pagado', 'Pendiente'].map(item => (<MenuItem value={item}>{item}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Button variant="contained" onClick={handleAddExpense}>Guardar</Button>
              <Button variant="text" onClick={handleClose}>Cancelar</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {user?.role === roles.SUPER_ADMIN
        && <Grid xs={12}>
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
            >

              {condominiums && condominiums.length > 0 && condominiums.map(item => (<MenuItem value={item._id}>{item.name}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
      }
      {(user?.role === roles.ADMIN || user?.role === roles.DIRECTIVE) && selected && <Button variant="contained" sx={{ marginBottom: "16px" }} onClick={handleOpen}>Nuevo</Button>}
      <TableContainer component={Paper} marginTop={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="p">Departamento</Typography></TableCell>
              <TableCell><Typography variant="p">Mes</Typography></TableCell>
              <TableCell><Typography variant="p">Año</Typography></TableCell>
              <TableCell><Typography variant="p">Vencimiento</Typography></TableCell>
              <TableCell><Typography variant="p">Monto</Typography></TableCell>
              <TableCell><Typography variant="p">Multa</Typography></TableCell>
              <TableCell><Typography variant="p">Estado</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              expenses && expenses.map(expense => (
                <TableRow>
                  <TableCell><Typography variant="p">{expense?.appartment?.number}</Typography></TableCell>
                  <TableCell><Typography variant="p">{expense?.month}</Typography></TableCell>
                  <TableCell><Typography variant="p">{expense?.year}</Typography></TableCell>
                  <TableCell><Typography variant="p">{expense?.dueDate}</Typography></TableCell>
                  <TableCell><Typography variant="p">{expense?.amount}</Typography></TableCell>
                  <TableCell><Typography variant="p">{0}</Typography></TableCell>
                  <TableCell><Typography variant="p">{expense?.status}</Typography></TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  )
}

export default CommonExpensesContent;