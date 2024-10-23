import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecords } from './CustomRecordsContext';

// Create theme
const theme = createTheme({
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: '#007FFF',
        },
        toolbar: {
          backgroundColor: 'transparent',
          color: '#007FFF',
        },
        selectIcon: {
          color: '#007FFF',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#007FFF',
        },
      },
    },
  },
});

const CustomDataGridComponent = () => {
  const { records } = useRecords();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      renderCell: () => <strong>Test</strong>, // Display "Test" instead of the actual ID
    },
    {
      field: 'value',
      headerName: 'Value',
      renderHeader: () => <strong>Value</strong>,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        rows={records}
        columns={columns}
        pageSize={5}
        // Keep the root-level sx prop already applied
        sx={{
          border: 'none !important',
          backgroundColor: 'transparent !important',
          // Move all other styles here with !important added
          '& .MuiDataGrid-root': {
            border: 'none !important',
            backgroundColor: 'transparent !important',
          },
          '& .MuiDataGrid-row': {
            border: 'none',
            borderTop: '1px solid #007FFF !important',
            borderBottom: '1px solid #007FFF !important',
          },
          '& .MuiDataGrid-cell': {
            border: 'none',
            borderRight: '1px solid #007FFF !important',
            color: '#007FFF !important',
          },
          '& .MuiDataGrid-iconSeparator, & .MuiDataGrid-withBorderColor, & .MuiDataGrid-row--borderBottom, & .MuiDataGrid-filler, & .MuiDataGrid-columnHeadersInner': {
            background: 'transparent !important',
            border: 'none !important',
            color: '#007FFF !important',
          },
        }}
      />
    </ThemeProvider>
  );
};

export default CustomDataGridComponent;
