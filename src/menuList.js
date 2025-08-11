import Home from './pages/Home';
import Users from './pages/Users';
import Database from './pages/Database';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

const menuList = [
  { path: '/', label: '首页', icon: <HomeIcon />, element: <Home /> },
  { path: '/users', label: '用户管理', icon: <PeopleIcon />, element: <Users /> },
  { path: '/database', label: '数据管理', icon: <InfoIcon />, element: <Database /> }
];

export default menuList;
