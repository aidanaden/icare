import StyledTextField from "@/components/Common/StyledTextField";
import { DepartmentType } from "@/enums";
import { NominationFormSubmissionDetails, StaffData, User } from "@/interfaces";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { TextFieldElementProps } from "react-hook-form-mui";
import { useRecoilState } from "recoil";
import { nominationFormState } from "@/atoms/nominationFormAtom";
import { Control, Controller, useFormState, useWatch } from "react-hook-form";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface AutoCompleteProps {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
  staffData: StaffData[] | [];
}

export default function Asynchronous({
  control,
  staffData,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<StaffData[] | []>([]);
  const loading = open && options?.length === 0;
  const dept = useWatch({ control, name: "department" });

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      if (dept?.toLowerCase() === "all") {
        setOptions(staffData);
      } else {
        const filteredStaffNames =
          staffData?.filter((staff) => staff.staff_department === dept) ?? [];
        setOptions(filteredStaffNames);
      }
    }

    return () => {
      active = false;
    };
  }, [loading, dept, staffData]);

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
          isOptionEqualToValue={(option, value) => {
            console.log(
              "option ",
              option,
              " and value ",
              value,
              " equality is ",
              option.staff_id === value.staff_id
            );
            return option.staff_id === value.staff_id;
          }}
          getOptionLabel={(option) => option.staff_name}
          options={options}
          loading={loading}
          fullWidth
          renderInput={(params) => (
            <StyledTextField
              {...params}
              label="Staff"
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
              required
            />
          )}
          {...field}
          ref={field.ref}
          onChange={(e, data) => {
            field.onChange(data);
          }}
        />
      )}
      name="user"
      control={control}
    />
  );
}
