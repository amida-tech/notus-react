import { useState } from 'react';
import {
  TextField,
} from '@mui/material';

export default function MemberSearch() {
  const [query, setQuery] = useState('');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      console.log('our query:', query)
    }
  }

  return (
    <TextField
      label="Search by member ID"
      variant="outlined"
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      fullWidth
      autoComplete="member-id-search"
    />
  )
}
