import { Box, Typography, Link } from '@mui/material';
import amidaLogo from '../../assets/img/amida_logo.png'
import theme from '../../assets/styles/AppTheme';

export default function Footer() {
  return (
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
          backgroundColor: theme.palette.bluegray?.D4,
          marginTop: '4rem',
          height: '.2rem',
          width: '90%',
          alignSelf: 'center',
        }}
      />
      <Box sx={{
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
          <Typography variant="body2">
            ©
            &nbsp;
            {new Date().getFullYear()}
          </Typography>
          <Link variant="body2" href="https://www.amida.com/" color={theme.palette.bluegray?.D2}>
            &nbsp;
            AMIDA TECHNOLOGY SOLUTIONS
            &nbsp;
          </Link>
          <Typography variant="body2">— ALL RIGHTS RESERVED</Typography>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', width: '95%', placeContent: 'flex-end',
        }}
        >
          <Link color={theme.palette.bluegray?.D2} href="https://www.amida.com/" sx={{ margin: '0 .75rem' }}>
            Amida
          </Link>
          <Link color={theme.palette.bluegray?.D2} href="https://github.com/amida-tech/saraswati-dashboard/blob/develop/LICENSE.md" sx={{ margin: '0 .75rem' }}>
            MIT License
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
