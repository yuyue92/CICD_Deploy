import Home from './pages/Home';
import Users from './pages/Users';
import About from './pages/About';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

const menuList = [
  { path: '/', label: '首页', icon: <HomeIcon />, element: <Home /> },
  { path: '/users', label: '用户管理', icon: <PeopleIcon />, element: <Users /> },
  { path: '/about', label: '关于', icon: <InfoIcon />, element: <About /> }
];

export default menuList;
