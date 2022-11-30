import {
    Box,
  } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../assets/styles/AppTheme'

const columns = [
  { field: 'headerName', headerName: 'Measure', description: 'This is a description', headerAlign: 'left', align: 'left', width: 250 },
  { field: 'inclusions', headerName: 'Remaining Inclusions', type: 'number', description: 'This is a description', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'population', headerName: 'Eligible Population', type: 'number', description: 'This is a description', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'numerator', headerName: 'Numerator', type: 'number', description: 'This is a description', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'denominator', headerName: 'Denominator', type: 'number', description: 'This is a description', headerAlign: 'center', align: 'center', width: 200 },
  { field: 'exclusions', headerName: 'Available Exclusions', type: 'number', description: 'This is a description', headerAlign: 'center', align: 'center', width: 200 },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

// research onCellClick features for boxes
// onPageChange for page change, update store?
// disable sort or get it to work
// page prop can be stored alongside pageSize, we should reset this on navigation

const title = 'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis'

const rows = [
  { id: 'AAB', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'ABB', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'CDA', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'FFA', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'GHA', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'KAE', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'NWQ', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'PIP', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'QOP', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'RTY', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'WWB', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
  { id: 'ZIZ', headerName: title, inclusions: '123', population: '110', numerator: '56', denominator: '42', exclusions: '77' },
];

export default function NewTable() {
  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        padding: '1rem .5rem',
        fontWeight: 'bold',
        fontSize: 'medium',
        color: theme.palette?.bluegray.D1,
    }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        density='comfortable'
        rowHeight={75}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        showCellRightBorder={false}
        showColumnRightBorder={false}
        disableColumnMenu
        filterMode='server'
        pagination='server'
        sortingMode='server'
        sx={{
          // CHECKBOX DIVS
          '& .MuiDataGrid-cellCheckbox, & .MuiDataGrid-columnHeaderCheckbox': {
            width: '100px !important',
            maxWidth: 'unset !important',
          },
          // CHECKBOX ICONS
          '& .Mui-checked': {
            color: theme.palette?.bluegray.main
          },
          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            fontSize: '1rem',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette?.background.main,
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal !important',
          },
          // WE DON'T NEED THESE BELOW ¯\_(ツ)_/¯
          '& .MuiDataGrid-sortIcon': {
            display: 'none'
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&	.MuiDataGrid-iconButtonContainer': {
            display: 'none',
          }
        }}
      />
    </Box>
  );
}