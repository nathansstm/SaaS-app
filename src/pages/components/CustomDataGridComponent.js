import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecords } from './CustomRecordsContext';

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: '#000000',
        },
        columnHeaders: {
          border: 'none',
          margin: '0',
          padding: '0',
          backgroundColor: '#000000',
          color: '#007FFF',
        },
        columnHeader: {
          borderBottom: 'none',
          padding: '0',
          margin: '0',
        },
        row: {
          border: 'none',
        },
        cell: {
          border: 'none',
          color: '#007FFF',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#007FFF',
        },
        toolbar: {
          backgroundColor: '#000000',
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

  const headerStyles = `
    .super-app-theme--header {
      background: #000000;
      color: #007FFF;
      font-size: 16px;
      border: none;
      margin: 0;
      padding: 0;
    }

    .MuiDataGrid-root .MuiDataGrid-iconSeparator,
    .MuiMenuItem-gutters,
    .MuiDivider-root {
      background: #000000;
      color: #000000;
    }
  
    .MuiList-root,
    .MuiList-root .MuiList-padding,
    .MuiList-root .MuiDataGrid-menuList,
    .MuiList-root .MuiListItemText-root,
    .MuiList-root .MuiListItemIcon-root,
    .MuiDataGrid-root .MuiDataGrid-withBorderColor,
    .MuiDataGrid-root .MuiDataGrid-filler,
    .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle,
    .MuiDataGrid-root .MuiDataGrid-columnHeadersInner {
      background: #000000 !important;
      border: none !important;
      color: #007FFF !important;
    }
  `;

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderHeader: () => <strong>ID</strong>,
    },
    {
      field: 'value',
      headerName: 'Value',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      renderHeader: () => <strong>Value</strong>,
    },
  ];

  return (
    <>
      <style>{headerStyles}</style>
      <ThemeProvider theme={theme}>
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={5}
        />
      </ThemeProvider>
    </>
  );
};

export default CustomDataGridComponent;
