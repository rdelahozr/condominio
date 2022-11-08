import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div">
      GESTIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/gastos-comunes"><ListItemText primary="Gastos Comunes" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/espacios-comunes"><ListItemText primary="Espacios Comunes" /></Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div">
      ADMINISTRACIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/condominio"><ListItemText primary="Condominios" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/propiedades"><ListItemText primary="Propiedades" /></Link>
    </ListItemButton>
    <ListItemButton>
      <Link to="/propietarios"><ListItemText primary="Propietarios" /></Link>
    </ListItemButton>
  </React.Fragment>
);

export const terciaryListItems = (
  <React.Fragment>
    <ListSubheader component="div">
      CONFIGURACIÓN
    </ListSubheader>
    <ListItemButton>
      <Link to="/usuarios"><ListItemText primary="Usuarios" /></Link>
    </ListItemButton>
  </React.Fragment>
);