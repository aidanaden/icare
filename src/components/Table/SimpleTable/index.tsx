import FallbackSpinner from "@/components/Common/FallbackSpinner";
import { NominationDataTableData } from "@/interfaces";
import { formatDateToString } from "@/utils";
import {
  Box,
  BoxProps,
  Checkbox,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { Column, SimpleColumn, simpleColumns } from "../Common/Columns";
interface Data {
  nominee: string;
  department: string;
  date: Date;
}

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
              {simpleColumns.map((column: Column) => (
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
                    {simpleColumns.map((column: SimpleColumn) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell
                          key={column.id}
                          align={column.align}
                          sx={{ px: 4 }}
                        >
                          {value?.toString()}
                          {/* {column.format && value instanceof Date
                            ? column.format(value)
                            : value!.toString()} */}
                        </StyledTableCell>
                      );
                    })}
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
