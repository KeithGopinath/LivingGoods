/*eslint-disable*/
import Dashboard from '../src/containers/Dashboard';
import DevicesList from '../src/containers/DevicesList';
import UsersList from './containers/UsersList';
import Settings from '../src/containers/Settings';
import Login from '../src/containers/Login';

// import Buttons from '../src/containers/Dashboard';
// import GridSystem from '../src/containers/Dashboard';
// import Panels from '../src/containers/Dashboard';
// import SweetAlert from '../src/containers/Dashboard';
// import Notifications from '../src/containers/Dashboard';
// import Icons from '../src/containers/Dashboard';
// import Typography from '../src/containers/Dashboard';
// import RegularForms from '../src/containers/Dashboard';
// import ExtendedForms from '../src/containers/Dashboard';
// import ValidationForms from '../src/containers/Dashboard';
// import Wizard from '../src/containers/Dashboard';
// import RegularTables from '../src/containers/Dashboard';
// import ExtendedTables from '../src/containers/Dashboard';
// import ReactTables from '../src/containers/Dashboard';
// import GoogleMaps from '../src/containers/Dashboard';
// import FullScreenMap from '../src/containers/Dashboard';
// import VectorMap from '../src/containers/Dashboard';
// import Charts from '../src/containers/Dashboard';
// import Calendar from '../src/containers/Dashboard';
// import UserPage from '../src/containers/Dashboard';
// import LoginPage from '../src/containers/Dashboard';
// import RegisterPage from '../src/containers/Dashboard';
// import LockScreenPage from '../src/containers/Dashboard';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    layout: '/admin',
    icon: 'pe-7s-graph',
    component: Dashboard,
  },
  {
    path: '/deviceslist',
    name: 'Devices',
    layout: '/admin',
    icon: 'pe-7s-plugin',
    component: DevicesList,
  },
  {
    path: '/userslist',
    name: 'Users',
    layout: '/admin',
    icon: 'pe-7s-note2',
    component: UsersList,
  },
  {
    path: '/popup',
    name: 'Build Version',
    layout: '/admin',
    icon: 'pe-7s-phone',
    component: '',
  },
  {
    path: '/settings',
    name: 'Settings',
    layout: '/admin',
    icon: 'pe-7s-news-paper',
    component: Settings,
  },
  {
    path: '',
    name: 'Logout',
    layout: '/admin',
    icon: 'pe-7s-moon',
    component: Login,
  },
  // {
  //   collapse: true,
  //   path: '/maps',
  //   name: 'Maps',
  //   state: 'openMaps',
  //   icon: 'pe-7s-map-marker',
  //   views: [
  //     {
  //       path: '/google-maps',
  //       layout: '/admin',
  //       name: 'Google Maps',
  //       mini: 'GM',
  //       component: GoogleMaps,
  //     },
  //     {
  //       path: '/full-screen-maps',
  //       layout: '/admin',
  //       name: 'Full Screen Map',
  //       mini: 'FSM',
  //       component: FullScreenMap,
  //     },
  //     {
  //       path: '/vector-maps',
  //       layout: '/admin',
  //       name: 'Vector Map',
  //       mini: 'VM',
  //       component: VectorMap,
  //     },
  //   ],
  // },
  // {
  //   path: '/charts',
  //   layout: '/admin',
  //   name: 'Charts',
  //   icon: 'pe-7s-graph1',
  //   component: Charts,
  // },
  // {
  //   path: '/calendar',
  //   layout: '/admin',
  //   name: 'Calendar',
  //   icon: 'pe-7s-date',
  //   component: Calendar,
  // },
  // {
  //   collapse: true,
  //   path: '/pages',
  //   name: 'Pages',
  //   state: 'openPages',
  //   icon: 'pe-7s-gift',
  //   views: [
  //     {
  //       path: '/user-page',
  //       layout: '/admin',
  //       name: 'User Page',
  //       mini: 'UP',
  //       component: UserPage,
  //     },
  //     {
  //       path: '/login-page',
  //       layout: '/auth',
  //       name: 'Login Page',
  //       mini: 'LP',
  //       component: LoginPage,
  //     },
  //     {
  //       path: '/register-page',
  //       layout: '/auth',
  //       name: 'Register',
  //       mini: 'RP',
  //       component: RegisterPage,
  //     },
  //     {
  //       path: '/lock-screen-page',
  //       layout: '/auth',
  //       name: 'Lock Screen Page',
  //       mini: 'LSP',
  //       component: LockScreenPage,
  //     },
  //   ],
  // },
];

export default routes;
