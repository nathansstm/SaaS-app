import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useRecords } from './CustomRecordsContext'; // Import the context

// Custom styles for headers, rows, and footer
const style = `
  .super-app-theme--header,
  .super-app-theme--row,
  .super-app-theme--row-alt,
  .super-app-theme--footer,
  .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer,
  .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon,
  .MuiDataGrid-root .MuiDataGrid-cell,
  .MuiDataGrid-root .MuiDataGrid-row,
  .MuiDataGrid-root .MuiDataGrid-footerCell,
  .MuiDataGrid-root .MuiDataGrid-footer,
  .MuiTablePagination-root,
  .MuiTablePagination-actions,
  .MuiDataGrid-root,
  .MuiDataGrid-columnHeaders,
  .MuiDataGrid-root .MuiDataGrid-row--odd,
  .MuiDataGrid-root .MuiDataGrid-row--even,
  .MuiDataGrid-root .MuiDataGrid-columnHeaderWrapper,
  .MuiDataGrid-root .MuiDataGrid-columnHeaders,
  .MuiDataGrid-footerContainer,
  .MuiDataGrid-root .MuiDataGrid-viewport,
  .MuiDataGrid-root .MuiDataGrid-container,
  .MuiPaper-root,
  .MuiDataGrid-root .MuiDataGrid-footerRow,
  .MuiDataGrid-root .MuiDataGrid-row:last-child,
  .MuiDataGrid-root .MuiDataGrid-bottomContainer,
  .MuiDataGrid-root .MuiDataGrid-virtualScroller,
  .MuiDataGrid-root .MuiDataGrid-footerCell {
    background-color: #000000;
    color: #007FFF;
    border: none !important;
  }
`;

const CustomDataGridComponent = () => {
  const { records } = useRecords();

  // Define columns with custom header classes
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 300,
      headerClassName: 'super-app-theme--header',
    },
  ];

  // Function to apply custom classes to rows
  const getRowClassName = (params) => {
    return params.index % 2 === 0 ? 'super-app-theme--row' : 'super-app-theme--row-alt';
  };

  // Inline style for DataGrid background
  const gridStyle = {
    backgroundColor: '#000000', // Custom background for the entire DataGrid
  };

  return (
    <>
      {/* Inject custom styles for the grid */}
      <style>{style}</style>

      <Paper style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={records}
          columns={columns}
          pageSize={5}
          getRowClassName={getRowClassName}
          style={gridStyle}
          borderColor="#000000"
          gridLines="none"
          componentsProps={{
            footer: {
              className: 'super-app-theme--footer',
            },
            pagination: {
              className: 'MuiTablePagination-root', // Apply styles to pagination
            },
          }}
        />
      </Paper>
    </>
  );
};

export default CustomDataGridComponent;


