import TableMenu from "@/components/Common/Menu/TableMenu";
import FeedbackSnackbar from "@/components/Forms/Common/FeedbackSnackbar";
import { NominationFormStatus, DepartmentType, ServiceLevel } from "@/enums";
import { CommitteeMemberVote, NominationDataTableData } from "@/interfaces";
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
import { useState, useEffect } from "react";
import DepartmentSelect from "../DepartmentSelect";
import {
  StyledTableCell,
  TextTableCell,
  BadgeTableCell,
  CommitteeVoteTableCell,
} from "../TableCells";
import { Column } from "../Columns";

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

function getComparator<Key extends keyof NominationDataTableData>(
  order: Order,
  orderBy: Key
): (a: NominationDataTableData, b: NominationDataTableData) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface DataTableTabPanelProps {
  headerLabel: string;
  viewText?: string;
  status: NominationFormStatus | "completed";
  data?: NominationDataTableData[];
  columns: readonly Column[];
  displayCommitteeVote?: boolean;
}

export default function DataTableTabPanel({
  viewText,
  status,
  data,
  columns,
  displayCommitteeVote,
}: DataTableTabPanelProps) {
  const [displayedData, setDisplayedData] = useState<
    NominationDataTableData[] | undefined
  >(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // set up order-by filter
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof NominationDataTableData>(
    "nomination_created_date"
  );
  const [secondOrderBy, setSecondOrderBy] = useState<
    keyof NominationDataTableData
  >("nomination_submitted_date");

  // set up department filter
  const [departmentType, setDepartmentType] = useState<DepartmentType>(
    DepartmentType.ALL
  );
  const departmentValues = Array.from(
    new Set(
      data
        ?.flatMap((data) => [data.nominee_department as DepartmentType])
        .concat(DepartmentType.ALL)
        .reverse()
    )
  );

  // set up team filter
  // const teamValues = Array.from(
  //   new Set(
  //     data
  //       ?.flatMap((data) => [data.nominee_team])
  //       .concat("All")
  //       .reverse()
  //   )
  // );
  // const hasTeamValues = teamValues.length > 0 && teamValues[0] !== undefined;
  // const [teamType, setTeamType] = useState<string>("All");

  // set up championship nominations
  const championNominations = data?.filter((d) => d.is_champion_result);
  const hasChampions = championNominations && championNominations?.length > 0;

  // set up delete snackbar states
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState<boolean>(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState<boolean>(false);

  // sort filter effect
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NominationDataTableData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler =
    (property: keyof NominationDataTableData) =>
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

  // department filter effect
  useEffect(() => {
    if (departmentType !== DepartmentType.ALL) {
      setDisplayedData(
        data?.filter((row) => row.nominee_department === departmentType)
      );
    } else {
      setDisplayedData(data);
    }
  }, [departmentType, data]);

  // team filter effect
  // useEffect(() => {
  //   if (teamType !== "All") {
  //     setDisplayedData(data?.filter((row) => row.nominee_team === teamType));
  //   } else {
  //     setDisplayedData(data);
  //   }
  // }, [teamType, data]);

  return (
    <TabPanel value={status} sx={{ p: 0 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} p={3}>
        <DepartmentSelect
          departments={departmentValues}
          departmentType={departmentType}
          setDepartmentType={setDepartmentType}
        />
        {/* {hasTeamValues && (
          <TeamSelect
            teams={teamValues}
            teamType={teamType}
            setTeamType={setTeamType}
          />
        )} */}
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
              {columns.map((column) => (
                <>
                  {column.id === "nominee_team" ||
                  (column.id === "nominator_name" && !hasChampions) ||
                  (column.id === "committee_vote" && !displayCommitteeVote) ? (
                    <></>
                  ) : (
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
                  )}
                </>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData
              ?.sort(getComparator(order, orderBy))
              ?.sort(getComparator(order, secondOrderBy))
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row: NominationDataTableData, i: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "nomination_status") {
                        return (
                          <BadgeTableCell
                            value={value as string}
                            column={column}
                          />
                        );
                      } else if (
                        column.id === "committee_vote" &&
                        displayCommitteeVote
                      ) {
                        return (
                          <CommitteeVoteTableCell
                            value={value as CommitteeMemberVote[]}
                            column={column}
                          />
                        );
                      } else if (
                        column.id === "nominee_team" ||
                        (column.id === "nominator_name" && !hasChampions)
                      ) {
                        return <></>;
                      } else if (column.id === "quiz_service_level") {
                        return (
                          <TextTableCell
                            value={
                              row.draft_status
                                ? "Not Available"
                                : ServiceLevel[value as ServiceLevel]
                            }
                            column={column}
                          />
                        );
                      } else if (column.id === "nomination_created_date") {
                        const dateValue = row.draft_status
                          ? row.nomination_created_date
                          : row.nomination_submitted_date;
                        return (
                          <TextTableCell value={dateValue} column={column} />
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
                    <TableCell align="right">
                      <TableMenu
                        viewText={viewText}
                        case_id={row.case_id}
                        isEditable={
                          row.nomination_status ===
                          NominationFormStatus.INCOMPLETE
                        }
                        isDeletable={
                          row.nomination_status ===
                          NominationFormStatus.INCOMPLETE
                        }
                        displayedData={displayedData}
                        setDisplayedData={setDisplayedData}
                        setDeleteSuccessOpen={setDeleteSuccessOpen}
                        setDeleteErrorOpen={setDeleteErrorOpen}
                      />
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
      <FeedbackSnackbar
        successOpen={deleteSuccessOpen}
        errorOpen={deleteErrorOpen}
        setSuccessOpen={setDeleteSuccessOpen}
        setErrorOpen={setDeleteErrorOpen}
        successMsg={"Deleted nomination successfully."}
        errorMsg={"Error occurred while deleting nomination. Please try again."}
      />
    </TabPanel>
  );
}
