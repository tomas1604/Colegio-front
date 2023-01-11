import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    link: '/pages/dashboard',
    icon:'home-outline',    
  },
  {
    title: 'Iniciar Sesión',
    link: '/pages/seguridad/login',
    icon:'log-in-outline',
    home: true,
  },  
  {
    title:'Módulo estudiantes',
    link:'/pages/estudiantes/listar',
    icon:'people-outline'
  },
  {
    title: 'Cerrar Sesión',
    link: '/pages/seguridad/login',
    icon:'close-square-outline',
  }
  
];
