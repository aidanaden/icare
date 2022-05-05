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

interface SimpleColumn {
  id: "nominee" | "department" | "date";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: Date) => string;
}

const columns: readonly SimpleColumn[] = [
  { id: "nominee", label: "Nominee", minWidth: 170 },
  { id: "department", label: "Department", minWidth: 100 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: formatDateToString,
  },
];

interface Data {
  nominee: string;
  department: string;
  date: Date;
}

function createData(nominee: string, department: string, date: Date): Data {
  return { nominee, department, date };
}

const rows = [
  createData("Jolynn", "IT", new Date()),
  createData("Jolynn", "AUDIT", new Date()),
  createData("Jolynn", "SFIT", new Date()),
  createData("Jolynn", "AUDIT", new Date()),
  createData("Jolynn", "IT", new Date()),
];

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

export default function SimpleTable({ ...other }: BoxProps) {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
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
                  {columns.map((column) => {
                    const value = row[column.id];
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
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
