import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { NominationDataTableData } from "@/interfaces";
import {
  Box,
  BoxProps,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Column,
  simpleColumns,
  SimpleDataTableKeys,
} from "../Components/Columns";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F5F6F9",
    color: "#637381",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 500,
    color: "#212b36",
  },
}));

interface SimpleTableProps extends BoxProps {
  rows: Omit<NominationDataTableData, "nomination_status">[];
}

export default function SimpleTable({ rows, ...other }: SimpleTableProps) {
  return (
    <Box {...other}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
              {simpleColumns.map((column: Column<SimpleDataTableKeys>) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows ? (
              rows.map((row, i) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={i}
                    sx={{
                      "&.MuiTableRow-hover:hover": {
                        cursor: "pointer",
                        backgroundColor: "#F5F6F9",
                      },
                    }}
                  >
                    {simpleColumns.map(
                      (column: Column<SimpleDataTableKeys>) => {
                        let value = row[column.id];
                        if (column.id === "nomination_created_date") {
                          value =
                            column.id === "nomination_created_date" && !value
                              ? row.nomination_submitted_date
                              : row.nomination_created_date;
                        }
                        return (
                          <StyledTableCell
                            key={column.id}
                            align={column.align}
                            sx={{ px: 4 }}
                          >
                            {value?.toString()}
                          </StyledTableCell>
                        );
                      }
                    )}
                  </TableRow>
                );
              })
            ) : (
              <FallbackSpinner />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
