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
import { fetchStaff } from "@/lib/nominations";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const getStaffName = (staffDatas: StaffData[]): string[] => {
  return staffDatas.map((staffData) => staffData.staff_name);
};

interface AutoCompleteProps {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
  getValues: any;
}

export default function Asynchronous({ control }: AutoCompleteProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<StaffData[]>([]);
  const loading = open && options.length === 0;
  const [staffData, setStaffData] = useState<StaffData[]>([]);
  const dept = useWatch({ control, name: "department" });

  useEffect(() => {
    const fetchStaffDataLoad = async () => {
      const data = await fetchStaff("", "");
      setStaffData(data);
    };
    fetchStaffDataLoad();
  }, []);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      if (dept?.toLowerCase() === "all") {
        console.log("useEffect department changed to all: ", dept);
        setOptions(staffData);
      } else {
        console.log("useEffect department changed to: ", dept);
        const filteredStaffNames =
          staffData?.filter((staff) => staff.staff_department === dept) ?? [];

        console.log(
          "new filtered staff names from dept change: ",
          filteredStaffNames
        );
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

  useEffect(() => {
    console.log("options changed to :", options);
  }, [options]);

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
