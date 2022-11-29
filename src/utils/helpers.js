export const isProduction = process.env.NODE_ENV === 'production';

export const roles = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  JANITOR: 'Conserje',
  DIRECTIVE: 'Directiva',
  RESIDENT: 'Residente'
}

export const mainPageAllowedRoles = [
  ...Object.values(roles)
];

