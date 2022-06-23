import { ServiceLevel } from "@/enums";
import { WinnerData } from "@/interfaces";
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
  TableSortLabel,
} from "@mui/material";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StyledTableCell, TextTableCell } from "../../Components/TableCells";
import { winnerColumns } from "../../Components/Columns";
import { PastWinnerTableKeys } from "../../Components/Columns";
import YearSelect from "../../Components/YearSelect";
import Select from "@/components/Common/Select";
import FallbackSpinner from "@/components/Common/FallbackSpinner";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof PastWinnerTableKeys>(
  order: Order,
  orderBy: Key
): (a: WinnerData, b: WinnerData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface WinnerTabPanelProps {
  headerLabel: string;
  status: string;
  data?: WinnerData[];
  year: string;
  years: string[];
  setYear: Dispatch<SetStateAction<string>>;
}

export default function DataTableTabPanel({
  headerLabel,
  status,
  data,
  year,
  years,
  setYear,
}: WinnerTabPanelProps) {
  const [displayedData, setDisplayedData] = useState<WinnerData[] | undefined>(
    data
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // set up order-by filter
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof PastWinnerTableKeys>(
    "committee_service_level"
  );

  // set up championship nominations
  const championNominations = data?.filter((d) => d.is_champion_result);
  const hasChampions = championNominations && championNominations?.length > 0;

  // set up service level filter
  const [serviceLevel, setServiceLevel] = useState<string>("All");
  const serviceLevelValues = Array.from(
    new Set(
      data
        ?.flatMap((data) => [
          ServiceLevel[data.committee_service_level as ServiceLevel],
        ])
        .concat("All")
        .reverse()
    )
  );

  // sort filter effect
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PastWinnerTableKeys
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof PastWinnerTableKeys) =>
    (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  // change of page / change no. of rows per page filter effect
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // search filter
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filteredData = data?.filter((row) =>
      row.nominee_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDisplayedData(filteredData);
    setPage(0);
  };

  // service level filter effect
  useEffect(() => {
    if (serviceLevel !== "All") {
      setDisplayedData(
        data?.filter(
          (row) =>
            ServiceLevel[row.committee_service_level as ServiceLevel] ===
            serviceLevel
        )
      );
    } else {
      setDisplayedData(data);
    }
  }, [serviceLevel, data]);

  useEffect(() => {
    console.log("data changed to: ", data);
    setDisplayedData(data);
  }, [data]);

  return (
    <TabPanel value={status} sx={{ p: 0 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        p={3}
        // bgcolor="grey.100"
      >
        {/* {hasTeamValues && (
          <TeamSelect
            teams={teamValues}
            teamType={teamType}
            setTeamType={setTeamType}
          />
        )} */}
        <YearSelect
          header="Year"
          values={years}
          defaultValue={year}
          setValueType={setYear}
        />
        {serviceLevelValues.length > 0 && (
          <Select
            header="Service Level"
            values={serviceLevelValues}
            defaultValue={serviceLevel}
            setValueType={setServiceLevel}
          />
        )}
        <TextField
          id="input-with-search-icon-textfield"
          placeholder="Search for nominee..."
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
          onChange={handleSearchTextChange}
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
              "& th:first-of-type": {
                borderRadius: "12px 0 0 12px",
              },
              "& th:last-child": {
                borderRadius: "0 12px 12px 0",
              },
            }}
          >
            <TableRow>
              {winnerColumns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "desc"}
                    onClick={createSortHandler(column.id)}
                    sx={{
                      textAlign: `${column.align}`,
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData ? (
              displayedData
                ?.sort(getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: WinnerData, i: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {winnerColumns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "committee_service_level") {
                          return (
                            <TextTableCell
                              value={ServiceLevel[value as ServiceLevel]}
                              column={column}
                            />
                          );
                        } else if (column.id === "nominator_name") {
                          return (
                            <TextTableCell
                              value={value as string}
                              column={column}
                              hasRightBorder={true}
                            />
                          );
                        } else {
                          return (
                            <TextTableCell
                              value={value as string}
                              column={column}
                            />
                          );
                        }
                      })}
                    </TableRow>
                  );
                })
            ) : (
              <FallbackSpinner height={"180px"} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={displayedData?.length ?? 0}
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
    </TabPanel>
  );
}
