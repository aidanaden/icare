import TableMenu from "@/components/Common/Menu/TableMenu";
import { NominationFormStatus, DepartmentType } from "@/enums";
import { DataTableData } from "@/interfaces";
import { Search } from "@mui/icons-material";
import { TabPanel } from "@mui/lab";
import {
  Stack,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  tableCellClasses,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Divider,
  TablePagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { columns } from "../Columns";
import DepartmentSelect from "../DepartmentSelect";
import { StyledTableCell, TextTableCell, DateTableCell } from "../TableCells";

export interface DataTableTabPanelProps {
  headerLabel: string;
  status: NominationFormStatus | "completed";
  data: DataTableData[];
}

export default function DataTableTabPanel({
  headerLabel,
  status,
  data,
}: DataTableTabPanelProps) {
  const [displayedData, setDisplayedData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [departmentType, setDepartmentType] = useState<DepartmentType>(
    DepartmentType.ALL
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (departmentType !== DepartmentType.ALL) {
      setDisplayedData(data.filter((row) => row.department === departmentType));
    } else {
      setDisplayedData(data);
    }
  }, [departmentType]);

  return (
    <TabPanel value={status} sx={{ p: 0 }}>
      <>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} p={3}>
          <DepartmentSelect
            departmentType={departmentType}
            setDepartmentType={setDepartmentType}
          />
          <TextField
            id="input-with-search-icon-textfield"
            placeholder="Enter nomination..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: "8px" },
            }}
            variant="outlined"
            fullWidth
          />
        </Stack>
        <TableContainer sx={{ maxHeight: 480, px: 1 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
              "& .MuiTableRow-root:hover": {
                backgroundColor: "#F5F6F9",
              },
            }}
          >
            <TableHead
              sx={{
                "& th": {
                  px: 4,
                },
                "& th:first-child": {
                  borderRadius: "12px 0 0 12px",
                },
                "& th:last-child": {
                  borderRadius: "0 12px 12px 0",
                },
              }}
            >
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "status") {
                          return (
                            <TextTableCell value={value} column={column} />
                          );
                        } else {
                          return (
                            <DateTableCell value={value} column={column} />
                          );
                        }
                      })}
                      <TableCell align="right">
                        <TableMenu />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={displayedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            ".MuiTablePagination-toolbar": {
              py: 1,
              pl: 3,
            },
            ".MuiTablePagination-actions": {
              pr: 2,
            },
          }}
        />
      </>
    </TabPanel>
  );
}
