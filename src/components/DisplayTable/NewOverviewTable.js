import { useState, useEffect } from 'react'
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../assets/styles/AppTheme'
import { formatData } from '../Utilities/MeasureTable';

// research onCellClick features for boxes
// onPageChange for page change, update store?
// disable sort or get it to work
// page prop can be stored alongside pageSize, we should reset this on navigation


// headerInfo = columns
// selectedMeasures = rows

export default function OverviewTable({ activeMeasure, headerInfo, currentResults, handleSelectedMeasureChange }) {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {

    const columnData = Object.values(headerInfo)
      .map((info, idx) => {
        return ({
          field: info.key,
          headerName: info.header,
          description: info.tooltip,
          headerAlign: idx == 0 ? 'left' : 'center',
          align: idx == 0 ? 'left' : 'center',
          width: idx == 0 ? 250 : 200
          // add color here ?
        })
    })
    const rowData = formatData(currentResults)

    setColumns(columnData)
    setRows(rowData)
    
  }, [currentResults])

  const handleSelectionModelChange = (event) => {
    console.log('event', event, currentResults)

    const newSelections = event
      .map(label => currentResults
        .find(measure => measure.label == label)
        .measure
      )
      
    console.log('new selections', newSelections)

    handleSelectedMeasureChange(newSelections)
  }

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
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        showCellRightBorder={false}
        showColumnRightBorder={false}
        onSelectionModelChange={(event) => handleSelectionModelChange(event)}
        onRowClick={() => console.log('go to')}
        disableColumnMenu
        // filterMode='server'
        pagination='client'
        // sortingMode='server'
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
          // WE DON'T NEED THESE BELOW SO WE HIDE ¯\_(ツ)_/¯
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