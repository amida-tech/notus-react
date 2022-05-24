import React, {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Box, List, ListItem,
} from '@mui/material';
import env from '../env';

const axios = require('axios').default;

const memberQueryUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members/info/`);

function MemberInfo({ id }) {
  const [memberInfo, setMemberInfo] = useState({});
  const values = [];
  let measure = '';

  useEffect(() => {
    axios.get(`${memberQueryUrl}?memberId=${id}`)
      .then((res) => {
        setMemberInfo(res.data);
      });
  }, [id]);

  if (memberInfo.memberId) {
    measure = memberInfo.measurementType;
    const memberData = memberInfo[memberInfo.memberId]
    const denominatorFields = Object.keys(memberData).filter((field) => field.startsWith('Denominator'));

    denominatorFields.forEach((denomField) => {
      let numerField = 'Numerator';
      if (denomField.includes(' ')) {
        numerField += denomField.split(' ')[1];
      }
      let numerValue = '';
      let denomValue = '';
      if (Array.isArray(memberData[denomField])) {
        denomValue = memberData[denomField].length;
        numerValue = memberData[numerField].length;
      } else {
        denomValue = memberData[denomField] ? 1 : 0;
        numerValue = memberData[numerField] ? 1 : 0;
      }
      values.push(
        <ListItem key={denomField}>
          {denomField}
          {': '}
          {denomValue}
          {' - '}
          {numerField}
          {': '}
          {numerValue}
        </ListItem>,
      )
    });
  }

  return (
    <Box>
      <Typography variant="h2" className="rating-trends__h2-header">
        {`Member Info ${id}`}
      </Typography>
      <Typography>
        {`Measure: ${measure}`}
      </Typography>
      <List>{values}</List>
    </Box>
  )
}

MemberInfo.propTypes = {
  id: PropTypes.string,
}

MemberInfo.defaultProps = {
  id: '',
}

export default MemberInfo;
