import { useState, useContext } from 'react';
import {
  TextField,
} from '@mui/material';
import { memberInfoSearch } from '../Common/Controller'
import { DatastoreContext } from '../../context/DatastoreProvider';

export default function MemberSearch() {
  const { datastore, datastoreActions } = useContext(DatastoreContext);
  const [query, setQuery] = useState('');

  // We need access to setRowEntries and set with these four props in format data:
    // searched member info
    // active measure
    // datastore.info
    // table filter
  // OR we need to update datastore.results perhaps and it triggers a useEffect on dash
  // memberResults on dash is our target but the fifty billion useEffects will have
  // to be studied to make sure we hit it correctly

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const memberInfo = await memberInfoSearch(query)
      console.log(memberInfo)
      datastoreActions.setMemberResults(memberInfo)
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
