import { useState, useEffect, useContext } from 'react';
import {
  TextField, IconButton, InputAdornment,
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { memberInfoSearch } from '../Common/Controller';
import { DatastoreContext } from '../../context/DatastoreProvider';

export default function MemberSearch() {
  const { datastore, datastoreActions } = useContext(DatastoreContext);
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const memberInfo = await memberInfoSearch(query);
      datastoreActions?.setMemberResults(memberInfo);
    }
  };

  const handleCancel = async () => {
    setQuery('');
    const memberInfo = await memberInfoSearch('');
    datastoreActions?.setMemberResults(memberInfo);
  };

  useEffect(() => {
    if (datastore?.memberResults.length === 0) {
      setQuery('');
    }
  }, [datastore?.memberResults]);

  return (
    <TextField
      label="Search by member ID"
      variant="outlined"
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      fullWidth
      autoComplete="member-id-search"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="cancel search"
              onClick={handleCancel}
              edge="end"
            >
              { query ? <CancelRoundedIcon /> : null }
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
