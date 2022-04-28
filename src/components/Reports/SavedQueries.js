import React from 'react'
import { Box, Typography } from '@mui/material';

const Queries = [
  { name: 'Yearly Comparison' },
  { name: 'Composite Report' },
  { name: 'Current Snapshot Report' },
  { name: '60 Day Camparison' },
];

export default function SavedQueries() {
  return (
    <Box className="saved-queries">
      <Typography variant="h2" className="saved-queries__h2-header">Saved Queries</Typography>
      <Typography className="saved-queries__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Typography>
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
