import StyledTextField from "@/components/Common/StyledTextField";
import { DepartmentType } from "@/enums";
import { NominationFormSubmissionDetails, User } from "@/interfaces";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { TextFieldElementProps } from "react-hook-form-mui";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import { Control, Controller } from "react-hook-form";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function Asynchronous({
  control,
}: {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly User[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(users);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option === value}
          getOptionLabel={(option) => option.name}
          options={options}
          loading={loading}
          fullWidth
          renderInput={(params) => (
            <StyledTextField
              {...params}
              label="User"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          {...field}
          ref={field.ref}
          onChange={(e, data) => field.onChange(data)}
        />
      )}
      name="user"
      control={control}
    />
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const users: User[] = [
  {
    staff_id: "593413",
    name: "Staff 1",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 2",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 3",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 4",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 5",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 6",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 7",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
  {
    staff_id: "593413",
    name: "Staff 8",
    department: DepartmentType.AUDIT,
    designation: "Intern",
    role: "Staff",
  },
];
