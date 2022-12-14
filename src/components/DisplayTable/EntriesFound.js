import {
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import theme from '../../assets/styles/AppTheme'

// this total will have to come from HERA as soon as backend pagination is created

export default function EntriesFound({ total, currentCount }) {
  return (
    <Box
      sx={{
        color: theme.palette?.bluegray.main,
        fontWeight: '600',
        fontStyle: 'italic',
        margin: '1rem 0 .5rem .5rem',
      }}
    >
      Results: Showing&nbsp;
      <Typography display="inline" sx={{ fontWeight: 800 }}>
        {currentCount}
      </Typography>
      &nbsp;of&nbsp;
      <Typography display="inline" sx={{ fontWeight: 800 }}>
        {total}
      </Typography>
    &nbsp;Total Entries Found
    </Box>
  )
}

EntriesFound.propTypes = {
  total: PropTypes.number,
  currentCount: PropTypes.number,
};

EntriesFound.defaultProps = {
  total: 0,
  currentCount: 0,
}
