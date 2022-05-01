import {
  alpha,
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useEffect, useState } from "react";
import { Search, MoreVert } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { formatDateToString } from "@/utils";
import BlueBadge from "../Common/Badge/BlueBadge";
import GreenBadge from "../Common/Badge/GreenBadge";
import TableMenu from "../Common/Menu/TableMenu";
import theme from "@/styles/theme";
import StyledMenuItem from "../Common/Menu/StyledMenuItem";
import { DataTableData } from "@/interfaces";
import { DepartmentType, NominationFormStatus } from "@/enums";
import RedBadge from "../Common/Badge/RedBadge";

interface Column {
  id: "nominee" | "department" | "date" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: Date) => string;
}

const columns: readonly Column[] = [
  { id: "nominee", label: "Nominee", minWidth: 100 },
  { id: "department", label: "Department", minWidth: 100 },
  { id: "status", label: "Status", align: "center", minWidth: 100 },
  {
    id: "date",
    label: "Created on",
    minWidth: 100,
    align: "right",
    format: formatDateToString,
  },
];

interface DataTableTabPanelProps {
  status:
    | NominationFormStatus.ALL
    | NominationFormStatus.INCOMPLETE
    | "completed";
  data: DataTableData[];
}

const DataTableTabPanel = ({ status, data }: DataTableTabPanelProps) => {
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    setDepartmentType(event.target.value as DepartmentType);
  };

  useEffect(() => {
    console.log("department type: ", departmentType);
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
          <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "black" }}>
              Nomination
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={departmentType}
              label="Department"
              onChange={handleSelectChange}
              input={
                <OutlinedInput
                  label="Department"
                  sx={{
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                />
              }
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "6px",
                    minWidth: 180,
                    color:
                      theme.palette.mode === "light"
                        ? "rgb(55, 65, 81)"
                        : theme.palette.grey[300],
                    boxShadow:
                      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                    "& .MuiMenu-list": {
                      pt: "6px",
                      px: "6px",
                      pb: "2px",
                    },
                    "& .MuiMenuItem-root": {
                      mb: "4px",
                      borderRadius: "6px",
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                        color: theme.palette.text.secondary,
                        marginRight: theme.spacing(1.5),
                      },
                      "&:active": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          theme.palette.action.selectedOpacity
                        ),
                      },
                    },
                  },
                },
              }}
            >
              {Object.values(DepartmentType).map((dept) => (
                <StyledMenuItem key={dept} value={dept.toString()}>
                  {dept}
                </StyledMenuItem>
              ))}
            </Select>
          </FormControl>
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
        <TableContainer sx={{ maxHeight: 440, px: 1 }}>
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
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                              sx={{ px: 4 }}
                            >
                              {value === NominationFormStatus.ENDORSED ? (
                                <GreenBadge>{value.toString()}</GreenBadge>
                              ) : value === NominationFormStatus.SUBMITTED ? (
                                <BlueBadge>{value.toString()}</BlueBadge>
                              ) : (
                                <RedBadge>{value.toString()}</RedBadge>
                              )}
                            </StyledTableCell>
                          );
                        } else {
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                              sx={{ px: 4 }}
                            >
                              {column.format && value instanceof Date
                                ? column.format(value)
                                : value.toString()}
                            </StyledTableCell>
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
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F6F9",
    color: "#637381",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    "&:hover": {
      backgroundColor: "#F5F6F9",
    },
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "capitalize",
  color: "#637381",
  fontWeight: 500,
  "&.Mui-selected": {
    color: "#212b36",
  },
}));

interface DataTableProps {
  data: DataTableData[];
}

export default function DataTable({ data, ...other }: DataTableProps) {
  const [nominationValue, setNominationValue] = useState<NominationFormStatus>(
    NominationFormStatus.ALL
  );

  const incompleteData = data.filter(
    (row) => row.status === NominationFormStatus.INCOMPLETE
  );
  const completedData = data.filter(
    (row) => row.status !== NominationFormStatus.INCOMPLETE
  );

  const TabPanelData: DataTableTabPanelProps[] = [
    {
      status: NominationFormStatus.ALL,
      data: data,
    },
    {
      status: "completed",
      data: completedData,
    },
    {
      status: NominationFormStatus.INCOMPLETE,
      data: incompleteData,
    },
  ];

  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: NominationFormStatus
  ) => {
    setNominationValue(newValue);
  };

  return (
    <TabContext value={nominationValue}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#F4F7F9",
          px: 2,
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >
        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
          <StyledTab label="All" value="all" disableRipple />
          <StyledTab label="Completed" value="completed" disableRipple />
          <StyledTab label="Incomplete" value="incomplete" disableRipple />
        </TabList>
      </Box>
      {TabPanelData.map((panelData, i) => (
        <DataTableTabPanel
          data={panelData.data}
          status={panelData.status}
          key={`panel ${i}`}
        />
      ))}
    </TabContext>
  );
}
