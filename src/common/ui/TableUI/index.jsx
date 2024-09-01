import PropTypes from "prop-types";
// import { useTheme } from "@mui/material/styles";
// import {
//   KeyboardArrowLeft,
//   KeyboardArrowRight,
//   LastPage,
//   FirstPage,
//   Close,
//   ExpandMore,
// } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import Loader from "../loader";
import React, { useState } from "react";
// import { Theme, ThemeNight } from "../../theme";

// for pagination
function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
  flagPagination = true,
}) {
  // ...

  // const classes = useStyles();
  // const theme = useTheme();

  // for come to rfrist page-----------------------------------------
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  // the button can back to before page------------------------------
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  // // the button can back to after page
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  // for last page-----------------------------------------------
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(1, Math.ceil(count / rowsPerPage)));
  };
  const handlePageButtonClick = (targetPage) => {
    onPageChange(null, targetPage - 1); // Add +1 to match your page numbering (1-based)
  };
  const handlePageChange = (event, value) => {
    onPageChange(event, value - 1);
  };



  const maxVisiblePages = 3;
  const totalPages = Math.ceil(count / rowsPerPage);
  return (
    <>
      {flagPagination ? (
        <Box sx={{ flexShrink: 0, width: "100%", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              className={classes.root}
              count={Math.ceil(count / rowsPerPage)}
              page={page + 1}
              onChange={handlePageChange}
              size="small"
            />
          </Stack>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
// this is main custom table-----------------------------------------------------

function CustomTable({
  columns,
  data,
  totalcount1,
  rowsPerPage,
  page,
  setRowsPerPage,
  setPage,
  backgroundColor = "white",
  // headerBackGroundColor = Theme.palette.primary.light,
  existPagination = true,
  existDetail = false,
  detailTabel,
  expandedRow,
  setExpandedRow,
}) {
  // const loader = useSelector((state) => state.getThem.loader);
  // const ThemMode = useSelector((state) => state.getThem.themMode);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const toggleAccordion = (rowIndex) => {
    if (existDetail) {
      if (expandedRow === rowIndex) {
        setExpandedRow(null);
      } else {
        setExpandedRow(rowIndex);
      }
    }
  };

  return (
    <div className="margin-top4">
      {/* {loader ? <Loader /> : ""} */}
      <TableContainer sx={{ borderRadius: "0.5rem" }}>
        <Table
          sx={{
            backgroundColor: backgroundColor,
            borderCollapse: "collapse",
            borderRadius: "0.5rem",
          }}
          aria-label="custom pagination table"
        >
          <TableHead
            sx={{
              backgroundColor: headerBackGroundColor,
            }}
          >
            <TableRow sx={{ borderRadius: "0.5rem" }}>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={columnIndex}
                  sx={{
                    width: column?.width,
                    textAlign: column?.textAlign ? column.textAlign : "center",
                    color: Theme.palette.primary.main,
                    fontWeight: "bold",

                  }}
                >
                  {column?.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <TableRow
                  sx={{ height: "3rem" }}
                  onClick={() => toggleAccordion(rowIndex)}
                >
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      sx={{
                        width: column?.width,
                        textAlign: column?.textAlign
                          ? column?.textAlign
                          : "center",
                        padding: 0,
                        fontSize: "0.875rem",
                      }}
                    >
                      {column?.render
                        ? column?.render(row, (newValue, index) => {
                          const newData = [...data];
                          newData[rowIndex] = {
                            ...newData[rowIndex],
                            [column.accessor]: newValue,
                          };
                        })
                        : row[column?.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
                {expandedRow === rowIndex && (
                  <TableRow>
                    <TableCell colSpan={columns?.length} sx={{ padding: 0 }}>
                      <Accordion sx={{ width: "100%", boxShadow: "none" }}>
                        <AccordionSummary sx={{ width: "100%" }}>
                          {detailTabel(row)}
                        </AccordionSummary>
                        <AccordionDetails></AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            {existPagination ? (
              <TablePagination
                sx={{ border: "none" }}
                labelDisplayedRows={({ from, to, count }) => `  `}
                align="center"
                rowsPerPageOptions={[]}
                count={totalcount1}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelRowsPerPage="انتخاب کردن ستون سطر ها"
              />
            ) : (
              ""
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CustomTable;



