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
  displayCommitteeServiceLevel?: boolean;
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
  displayCommitteeServiceLevel,
}: DataTableTabPanelProps) {
  const { user } = useAuth();
  const [displayedData, setDisplayedData] = useState<
    NominationDataTableData[] | undefined
  >(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // set up order-by filter
  const [order, setOrder] = useState<Order>("desc");
  const nominationDate = "nomination_date";
  const [orderBy, setOrderBy] =
    useState<keyof NominationDataTableData>(nominationDate);

  // set up department filter
  const [departmentType, setDepartmentType] = useState<string>("All");
  const departmentValues = Array.from(
    new Set(data?.flatMap((data) => [data.nominee_department]))
  )
    .sort((a, b) => a.localeCompare(b))
    .reverse()
    .concat("All")
    .reverse();

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
      data?.flatMap((data) => {
        if (displayCommitteeServiceLevel) {
          if (data.committee_service_level_result) {
            return [
              ServiceLevel[data.committee_service_level_result as ServiceLevel],
            ];
          }
          return "Waiting For Review";
        }

        return [ServiceLevel[data.quiz_service_level as ServiceLevel]];
      })
    )
  )
    .filter((v) => v !== undefined)
    .sort((a, b) => {
      if (a === "Waiting For Review") {
        return 1;
      }
      if (b === "Waiting For Review") {
        return -1;
      }
      return -a.localeCompare(b);
    })
    .concat("All")
    .reverse();

  // set up championship nominations
  const championNominations = data?.filter((d) => d.is_champion_result);
  const hasChampions = championNominations && championNominations?.length > 0;

  const hasDepartmentColumn = columns.some(
    (c) => c.id === "nominee_department"
  );

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

  // apply filters to display data
  const applyFiltersToData = ({
    departmentValue,
    yearValue,
    serviceLevelValue,
    searchValue,
  }: {
    departmentValue?: string;
    yearValue?: string;
    serviceLevelValue?: string;
    searchValue?: string;
  }) => {
    const filteredData = data?.filter((row) => {
      const isDepartment = departmentValue
        ? // if department present, filter using provided department
          departmentValue === "All"
          ? true
          : row.nominee_department === departmentValue
        : // if department value not present, filter using previous department
        departmentType !== "All"
        ? row.nominee_department === departmentType
        : true;

      const isYear = yearValue
        ? row.nomination_date.slice(-2) === yearValue.slice(-2)
        : true;

      const isServiceLevel = displayCommitteeServiceLevel
        ? serviceLevelValue
          ? // if service level value present, filter using provided service level
            serviceLevelValue === "All"
            ? true
            : serviceLevelValue === "Waiting For Review"
            ? !row.committee_service_level_result
            : ServiceLevel[
                row.committee_service_level_result as ServiceLevel
              ] === serviceLevelValue
          : // if service level value present, filter using previous service level
          serviceLevel === "All"
          ? true
          : serviceLevel === "Waiting For Review"
          ? !row.committee_service_level_result
          : ServiceLevel[row.committee_service_level_result as ServiceLevel] ===
            serviceLevel
        : serviceLevelValue
        ? // if service level value present, filter using provided service level
          serviceLevelValue === "All"
          ? true
          : ServiceLevel[row.quiz_service_level as ServiceLevel] ===
            serviceLevelValue
        : // if service level value present, filter using previous service level
        serviceLevel === "All"
        ? true
        : ServiceLevel[row.quiz_service_level as ServiceLevel] === serviceLevel;

      const isSearch =
        searchValue && searchValue !== ""
          ? row.nominee_name.toLowerCase().includes(searchValue.toLowerCase())
          : true;

      return isDepartment && isYear && isServiceLevel && isSearch;
    });
    return filteredData;
  };

  // search filter
  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayedData(
      applyFiltersToData({ searchValue: event.target.value.toLowerCase() })
    );
    setPage(0);
  };

  // department filter effect
  useEffect(() => {
    setDisplayedData(applyFiltersToData({ departmentValue: departmentType }));
    setPage(0);
  }, [departmentType]);

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
    setDisplayedData(applyFiltersToData({ serviceLevelValue: serviceLevel }));
    setPage(0);
  }, [serviceLevel]);

  // update displayed data if data changes
  useEffect(() => {
    setDisplayedData(applyFiltersToData({}));
    setPage(0);
  }, [data]);

  return (
    <TabPanel value={status} sx={{ p: 0 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} p={3}>
        {hasDepartmentColumn && (
          <DepartmentSelect
            departments={departmentValues}
            departmentType={departmentType}
            setDepartmentType={setDepartmentType}
          />
        )}
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
              {columns.map((column) => (
                <>
                  {column.id === "nominee_team" ||
                  (column.id === "nominator_name" &&
                    !hasChampions &&
                    hideNominator) ||
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
                ?.sort(getComparator(order, nominationDate))
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
                            !hasChampions &&
                            hideNominator)
                        ) {
                          return <></>;
                        } else if (column.id === "quiz_service_level") {
                          return (
                            <TextTableCell
                              value={
                                row.draft_status
                                  ? "Not Available"
                                  : displayCommitteeServiceLevel
                                  ? row.committee_service_level_result
                                    ? ServiceLevel[
                                        row.committee_service_level_result as ServiceLevel
                                      ]
                                    : "Waiting For Review"
                                  : ServiceLevel[
                                      row.quiz_service_level as ServiceLevel
                                    ]
                              }
                              column={column}
                            />
                          );
                        } else if (
                          (column.id === "nominator_name" && hasChampions) ||
                          (column.id === "nominator_name" && !hideNominator)
                        ) {
                          return (
                            <TextTableCell
                              value={value as string}
                              column={column}
                              hasRightBorder={true}
                            />
                          );
                        } else if (column.id === "nominee_name") {
                          // not voted if user is committee and not hod
                          // and committee vote attribute dont exist OR
                          // does not contain current committee member id
                          const hasNotVoted = user?.staff_id
                            ? user.role.includes(UserRole.COMMITTEE) &&
                              user.staff_id !== row.hod_id &&
                              (!row.committee_vote ||
                                row.committee_vote.filter(
                                  (com) => com.committee_id === user.staff_id
                                ).length === 0)
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
        rowsPerPageOptions={[20, 50, 100]}
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
