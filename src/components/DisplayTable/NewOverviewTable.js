import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function OverviewTable({
  activeMeasure, headerInfo, currentResults, colorMap, handleSelectedMeasureChange,
}) {
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])
  const [checkboxColors, setCheckboxColors] = useState('')
  const navigate = useNavigate()

  console.log(colorMap)

  useEffect(() => {
    const columnData = Object.values(headerInfo)
      .map((info, idx) => ({
        field: info.key,
        headerName: info.header,
        description: info.tooltip,
        headerAlign: idx == 0 ? 'left' : 'left',
        align: idx == 0 ? 'left' : 'center',
        width: idx == 0 ? 250 : 200,
        // add color here ?
      }))
    const rowData = formatData(currentResults)

    const mapping = rowData.map((measure) => colorMap
      .find((mapping) => (mapping.value === measure.value))?.color || theme.palette?.primary.main)
    const colorObj = {}

    const colorMaps = mapping?.reduce((colorObj, mapColor, idx) => {
      const colorClass = `& .MuiDataGrid-virtualScrollerRenderZone > div:nth-of-type(${idx + 1}) > div > span`
      colorObj[colorClass] = { color: mapColor }
      return colorObj
    }, colorObj)

    setCheckboxColors(colorMaps)
    setColumns(columnData)
    setRows(rowData)
  }, [currentResults])

  const handleSelectionModelChange = (event) => {
    const newSelections = event
      .map((label) => currentResults
        .find((measure) => measure.label == label)
        .measure)

    handleSelectedMeasureChange(newSelections)
  }

  const handleRowDoubleCLick = (event) => {
    if (activeMeasure.measure === 'composite') {
      navigate((`/${event.row.value}`))
    }
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
        density="comfortable"
        rowHeight={75}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        showCellRightBorder={false}
        showColumnRightBorder={false}
        onSelectionModelChange={(event) => handleSelectionModelChange(event)}
        onRowDoubleClick={(event) => handleRowDoubleCLick(event)}
        disableSelectionOnClick
        // filterMode='server'
        pagination="client"
        // sortingMode='server'
        sx={{
          // CHECKBOX DIVS
          '& .MuiDataGrid-cellCheckbox, & .MuiDataGrid-columnHeaderCheckbox': {
            width: '100px !important',
            maxWidth: 'unset !important',
          },
          // CHECKBOX ICONS
          ...checkboxColors,
          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            fontSize: '1rem',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette?.background.main,
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'normal !important',
          },
          '& .MuiDataGrid-cellContent': {
            transition: '100ms',
          },
          '& .MuiDataGrid-cellContent:hover': {
            color: theme.palette?.primary.main,
            cursor: 'pointer',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'unset',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'unset',
            transition: '100ms',
          },
          '& .MuiDataGrid-cell:focus-within:hover': {
            fontWeight: 'bold',
            color: theme.palette?.primary.main,
          },
          '& .MuiDataGrid-cellContent': {
            userSelect: 'none',
          },
          // WE DON'T NEED THESE BELOW SO WE HIDE ¯\_(ツ)_/¯
          '& .MuiDataGrid-sortIcon': {
            display: 'none',
          },
          '& .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '&	.MuiDataGrid-iconButtonContainer': {
            display: 'none',
          },
        }}
      />
    </Box>
  );
}
