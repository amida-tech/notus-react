import PropTypes from 'prop-types';
import {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  Skeleton
} from '@mui/material';
import { memberInfoFetch } from '../components/Common/Controller';
import ReportTable from '../components/Utilities/ReportTable';
import { DatastoreContext } from '../context/DatastoreProvider';
import env from '../env';
import MemberReportDisplay from '../components/MemberReport/MemberReportDisplay';

const memberInfoQueryUrl = new URL(`${env.REACT_APP_HEDIS_MEASURE_API_URL}members/info/`);

function MemberReportContainer({ id }) {
  const { datastore } = useContext(DatastoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [memberInfo, setMemberInfo] = useState();
  const [exportUrl, setExportUrl] = useState('')
  const [rowData, setRowData] = useState([]);
  const [description, setDescription] = useState('')
  const [coverageStatus, setCoverageStatus] = useState('')

  useEffect(() => {
    if (Object.keys(datastore.info).length > 0 && memberInfo) {
      setRowData(ReportTable.formatData(
        memberInfo,
        memberInfo.measurementType,
        datastore.info,
      ));
      setDescription(datastore?.info[memberInfo.measurementType].description || 'Measure description not currently available.')
      setIsLoading(datastore.isLoading);
    }
  }, [datastore, memberInfo]);

  useEffect( async () => {
    async function fetchData() {
      const result = await memberInfoFetch(memberInfoQueryUrl, id)
      setMemberInfo(result)
      setCoverageStatus(result.coverage?.find((item) => item.status?.value === 'active'))
      setExportUrl(`${env.REACT_APP_HEDIS_MEASURE_API_URL}exports/member/?memberId=${result.memberId}`)
    }
    await fetchData()
    
  }, [id]);

  return (
    memberInfo && !isLoading
    ? <MemberReportDisplay
        id={id}
        memberInfo={memberInfo}
        datastoreInfo={datastore.info}
        exportUrl={exportUrl}
        coverageStatus={coverageStatus}
        rowData={rowData}
        description={description}
      />
    :
    <Skeleton variant="rectangular" height='calc(100vh - 12rem - 14px)' animation="wave"/>
    // MUI anticipates loading skeletons alongside components,
    // so this seems to be the MUI-inelegant loading solution but wtvr
  )
}

MemberReportContainer.propTypes = {
  id: PropTypes.string,
}

MemberReportContainer.defaultProps = {
  id: '',
}

export default MemberReportContainer;
