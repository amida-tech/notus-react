import {
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'

// this total will have to come from HERA as soon as backend pagination is created

export default function EntriesFound ({total}) {
  return (
    <Box
    sx={{
      color: theme.palette?.bluegray.D1,
      fontWeight: '600',
      margin: '1.5rem 0 0 1.5rem',
    }}
  >
    Results:&nbsp;
      <Typography display="inline" sx={{ fontWeight: 800 }}>
        {total}
      </Typography>
    &nbsp;Entries Found
  </Box>
  )
}

EntriesFound.propTypes = {
  total: PropTypes.number,
};

EntriesFound.defaultProps = {
  total: 0,
}
