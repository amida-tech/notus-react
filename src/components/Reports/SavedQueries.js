import { Box, Typography } from '@mui/material';
import theme from '../../assets/styles/AppTheme'

const Queries = [
  { name: 'Yearly Comparison' },
  { name: 'Composite Report' },
  { name: 'Current Snapshot Report' },
  { name: '60 Day Camparison' },
];

export default function SavedQueries() {
  return (
    <Box
      sx={{
        color: theme.palette?.bluegray.D1,
        border: `1px solid ${theme.palette?.bluegray.L3}`,
      }}
      className="saved-queries"
    >
      <Typography variant="h2" className="saved-queries__h2-header">Saved Queries</Typography>
      <Typography className="saved-queries__text">
        Generate data based off your previous queries.
      </Typography>
      <ul className="saved-queries__past-search">
        {Queries.map((query) => (
          <li className="saved-queries__past-search-item">
            <a href="#/">
              {query.name}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  )
}
