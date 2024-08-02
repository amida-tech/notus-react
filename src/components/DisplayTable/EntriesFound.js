import {
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme';

// this total will have to come from HERA as soon as backend pagination is created

export default function EntriesFound({ total = 0 }) {
  return (
    <Box
      sx={{
        color: theme.palette?.bluegray.main,
        fontWeight: '600',
        fontStyle: 'italic',
        margin: '1rem 0 .5rem .5rem',
      }}
    >
      Results:&nbsp;
      <Typography display="inline" sx={{ fontWeight: 800 }}>
        {total}
      </Typography>
      &nbsp;Entries Found
    </Box>
  );
}

EntriesFound.propTypes = {
  total: PropTypes.number,
};

// EntriesFound.defaultProps = {
//   total: 0,
// };
