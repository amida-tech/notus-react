import {
  AppBar,
  Box,
  Toolbar,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const logout = () => {
  localStorage.removeItem('token');
}
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: (theme) => theme.palette.bluegray?.D4 }}>
        <Toolbar position="fixed">
          <Box>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text-nav-dashboard"
              to="/"
            >
              Saraswati
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'end' }}>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/' }}
            >
              Dashboard
            </Link>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text"
              to={{ pathname: '/reports/' }}
            >
              Reports
            </Link>
            <Link
              sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
              component={RouterLink}
              className="navbar__text-signout"
              to={{ pathname: '/auth/login' }}
              onClick={logout}
            >
              Sign Out
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  )
}

// export default function Navbar() {
//   return (
//     <Box className="navbar" sx={{ flexGrow: 1 }}>
//       <AppBar className="navbar__container">
//         <Toolbar className="navbar__toolbar">
//           <Box className="navbar__link-holder-left">
//             <Link
//               sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
//               component={RouterLink}
//               className="navbar__text-nav-dashboard"
//               to="/"
//             >
//               Saraswati
//             </Link>
//           </Box>

//           <Box className="navbar__link-holder-right">
//             <Link
//               sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
//               component={RouterLink}
//               className="navbar__text"
//               to={{ pathname: '/' }}
//             >
//               Dashboard
//             </Link>
//             <Link
//               sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
//               component={RouterLink}
//               className="navbar__text"
//               to={{ pathname: '/reports/' }}
//             >
//               Reports
//             </Link>
//             <Link
//               sx={{ color: (theme) => theme.palette.bluegray?.L5 }}
//               component={RouterLink}
//               className="navbar__text-signout"
//               to={{ pathname: '/auth/login' }}
//               onClick={logout}
//             >
//               Sign Out
//             </Link>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Offset />
//     </Box>
//   );
// }
