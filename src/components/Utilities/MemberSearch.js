import { useState, useContext } from 'react';
import {
  TextField,
} from '@mui/material';
import { memberInfoSearch } from '../Common/Controller'
import { DatastoreContext } from '../../context/DatastoreProvider';

export default function MemberSearch() {
  const { datastore } = useContext(DatastoreContext);
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const memberInfo = await memberInfoSearch(query)
      // the memberInfo needs to go into the datastore.results
      // console.log(memberInfo)
      console.log(datastore)
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
