import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom';
import { Divider, List } from '@mui/material';
import { roles } from '../../utils/helpers';

// TO DO: RUTAS POR ROLE

const superAdminItems = (
  <List component="nav">
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/condominios"><ListItemText primary="Condominios" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/usuarios"><ListItemText primary="Usuarios" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/propiedades"><ListItemText primary="Propiedades" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/espacios-comunes"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div">
      REPORTES
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
  </List>
);

const adminItems = (
  <List component="nav">
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/usuarios"><ListItemText primary="Usuarios" /></Link>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div">
      REPORTES
    </ListSubheader>
    <ListItemButton>
      <Link to="/espacios-comunes"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
  </List>
);

const janitorItems = (
  <List component="nav">
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/reservas"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div">
      REPORTES
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
  </List>
);

const directiveItems = (
  <List component="nav">
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/usuarios"><ListItemText primary="Usuarios" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/propiedades"><ListItemText primary="Propiedades" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/espacios-comunes"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div">
      REPORTES
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
  </List>
);

const residentItems = (
  <List component="nav">
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/reservas"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
    <ListSubheader component="div">
      REPORTES
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
  </List>
);

const handleNav = (role) => {
  switch(role){
    case roles.SUPER_ADMIN:
      return superAdminItems;
    case roles.ADMIN:
      return adminItems;
    case roles.JANITOR:
      return janitorItems;
    case roles.DIRECTIVE:
      return directiveItems;
    case roles.RESIDENT:
      return residentItems;
    default:
      return <></>
  }
}

export default handleNav;