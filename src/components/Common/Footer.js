import { Box, Typography, Link } from '@mui/material';
import { blueGrey } from '@mui/material/colors'
import amidaLogo from '../../assets/img/amida_logo.png'

export default function Footer() {
  return (
    <footer>
      <Box
        sx={{
          height: '10rem',
          width: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <Box
          sx={{
            backgroundColor: blueGrey[900],
            marginTop: '4rem',
            height: '.2rem',
            width: '90%',
            alignSelf: 'center',
          }}
        />
        <Box
          sx={{
            height: '5rem',
            width: '90%',
            display: 'flex',
            alignSelf: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '95%' }}>
            <img
              src={amidaLogo}
              style={{ width: '8rem', marginRight: '2rem' }}
              alt="Amida Logo"
            />
            <Typography variant="body1">
              ©
              &nbsp;
              {new Date().getFullYear()}
            </Typography>
            <Link variant="body1" href="https://www.amida.com/" color={blueGrey[700]}>
              &nbsp;
              AMIDA TECHNOLOGY SOLUTIONS
              &nbsp;
            </Link>
            <Typography variant="body1">— ALL RIGHTS RESERVED</Typography>
          </Box>
          <Box sx={{
            display: 'flex', alignItems: 'center', width: '95%', placeContent: 'flex-end',
          }}
          >
            <Link variant="body1" color={blueGrey[700]} href="https://www.amida.com/" sx={{ marginRight: '1.5rem' }}>
              Amida
            </Link>
            <Link variant="body1" color={blueGrey[700]} href="https://github.com/amida-tech/saraswati-dashboard/blob/develop/LICENSE.md">
              MIT License
            </Link>
          </Box>
        </Box>
      </Box>
    </footer>
  );
}
