import { useState, useEffect } from 'react';
import {
  TextField
} from '@mui/material';

export default function MemberSearch() {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <TextField
      label="Search by member ID"
      variant="outlined"
      value={query}
      onChange={handleChange}
      fullWidth
      autoComplete="member-id-search"
    />
  )
}
