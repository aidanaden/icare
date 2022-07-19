import TableMenu from "@/components/Common/Menu/TableMenu";
import FeedbackSnackbar from "@/components/Form/Common/FeedbackSnackbar";
import { NominationFormStatus, ServiceLevel, UserRole } from "@/enums";
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
import Select from "@/components/Common/Select";
import {
  StyledTableCell,
  TextTableCell,
  BadgeTableCell,
  CommitteeVoteTableCell,
} from "../TableCells";
import { Column, NominationDataTableKeys } from "../Columns";
import YearSelect from "../YearSelect";
import { nominationYearState } from "@/atoms/nominationYearAtom";
import { useRecoilState } from "recoil";
import useAuth from "@/hooks/useAuth";
import { getYearsBetweenYearAndCurrent } from "@/utils";
import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { getComparator, Order } from "../../utils";

export interface DataTableTabPanelProps {
  headerLabel: string;
  viewText?: string;
  status: NominationFormStatus | "completed";
  data?: NominationDataTableData[];
  columns: readonly Column<NominationDataTableKeys>[];
  displayCommitteeVote?: boolean;
  hasYear?: boolean;
  hideNominator?: boolean;
  hasBadge?: boolean;
}

export default function DataTableTabPanel({
  viewText,
  status,
  data,
  columns,
  displayCommitteeVote,
  hasYear,
  hideNominator,
  hasBadge,
}: DataTableTabPanelProps) {
  const { user } = useAuth();
  const [displayedData, setDisplayedData] = useState<
    NominationDataTableData[] | undefined
  >(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // set up order-by filter
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof NominationDataTableData>(
    "nomination_created_date"
  );
  const createdDateOrderBy = "nomination_created_date";
  const submittedDateOrderBy = "nomination_submitted_date";

  // set up department filter
  const [departmentType, setDepartmentType] = useState<string>("All");
  const departmentValues = Array.from(
    new Set(
      data
        ?.flatMap((data) => [data.nominee_department])
        .concat("All")
        .reverse()
    )
  );

  // set up year filter
  const [getNominationYearState, setNominationYearState] =
    useRecoilState(nominationYearState);
  const yearValues = getYearsBetweenYearAndCurrent(
    user?.year ?? new Date().getFullYear().toString()
  );

  // set up service level filter
  const [serviceLevel, setServiceLevel] = useState<string>("All");
  const serviceLevelValues = Array.from(
    new Set(
      data
        ?.flatMap((data) => [
          ServiceLevel[data.quiz_service_level as ServiceLevel],
        ])
        .concat("All")
        .reverse()
    )
  ).filter((v) => v !== undefined);

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
    if (departmentType !== "All") {
      setDisplayedData(
        data?.filter((row) => row.nominee_department === departmentType)
      );
    } else {
      setDisplayedData(data);
    }
  }, [departmentType, data]);

  // year filter effect
  // useEffect(() => {
  //   if (hasYear) {
  //     console.log("setting nomination yer state to: ", year);
  //     setNominationYearState(year);
  //   } else {
  //     setDisplayedData(
  //       data?.filter((row) => {
  //         if (row.nomination_submitted_date) {
  //           return (
  //             new Date(row.nomination_submitted_date)
  //               .getFullYear()
  //               .toString() === year
  //           );
  //         } else {
  //           return (
  //             new Date(row.nomination_created_date).getFullYear().toString() ===
  //             year
  //           );
  //         }
  //       })
  //     );
  //   }
  // }, [year, data]);

  // service level filter effect
  useEffect(() => {
    if (serviceLevel !== "All") {
      setDisplayedData(
        data?.filter(
          (row) =>
            ServiceLevel[row.quiz_service_level as ServiceLevel] ===
            serviceLevel
        )
      );
    } else {
      setDisplayedData(data);
    }
  }, [serviceLevel, data]);

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
        {hasYear && (
          <YearSelect
            header="Year"
            values={yearValues}
            defaultValue={getNominationYearState}
            setValueType={setNominationYearState}
          />
        )}
        {serviceLevelValues.length > 0 && (
          <Select
            header="Quiz Service Level"
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
                      {column.id.includes("date") ? (
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
                      ) : (
                        <>{column.label}</>
                      )}
                    </StyledTableCell>
                  )}
                </>
              ))}
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData ? (
              displayedData
                ?.sort(getComparator(order, orderBy))
                ?.sort(getComparator(order, createdDateOrderBy))
                ?.sort(getComparator(order, submittedDateOrderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: NominationDataTableData, i: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column) => {
                        const value = row[column.id] ?? "";
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
                              value={
                                value !== ""
                                  ? (value as CommitteeMemberVote[])
                                  : []
                              }
                              column={column}
                            />
                          );
                        } else if (
                          column.id === "nominee_team" ||
                          (column.id === "nominator_name" &&
                            (!hasChampions || hideNominator))
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
                        } else if (
                          column.id === "nominator_name" &&
                          (hasChampions || !hideNominator)
                        ) {
                          return (
                            <TextTableCell
                              value={value as string}
                              column={column}
                              hasRightBorder={true}
                            />
                          );
                        } else if (column.id === "nominee_name") {
                          const hasNotVoted = user?.staff_id
                            ? user.role.includes(UserRole.COMMITTEE) &&
                              !row.committee_vote
                                ?.map((c) => c.committee_id)
                                .includes(user?.staff_id)
                            : false;
                          return (
                            <TextTableCell
                              value={value as string}
                              column={column}
                              hasBadge={hasNotVoted && hasBadge}
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
                })
            ) : (
              <FallbackSpinner />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[20]}
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
