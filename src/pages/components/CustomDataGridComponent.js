import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import { useRecords } from './CustomRecordsContext';

// Create a styled version of DataGrid
const StyledDataGrid = styled(DataGrid)`
  & .MuiDataGrid-root {
    border: none !important;
    background-color: transparent !important;
  }

  & .MuiDataGrid-row {
    border: none;
    border-top: 1px solid #007FFF;
    border-bottom: 1px solid #007FFF;
  }

  & .MuiDataGrid-cell {
    border: none;
    border-right: 1px solid #007FFF;
    color: #007FFF;
  }

  & .MuiDataGrid-iconSeparator,
  & .MuiDataGrid-withBorderColor,
  & .MuiDataGrid-row--borderBottom,
  & .MuiDataGrid-filler,
  & .MuiDataGrid-columnHeadersInner {
    background: transparent !important;
    border: none !important;
    color: #007FFF !important;
  }
`;

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
      <StyledDataGrid
        rows={records}
        columns={columns}
        pageSize={5}
        sx={{
          border: 'none',
          backgroundColor: 'transparent',
        }}
      />
    </ThemeProvider>
  );
};

export default CustomDataGridComponent;
