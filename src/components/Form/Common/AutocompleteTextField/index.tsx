import StyledTextField from "@/components/Common/StyledTextField";
import useAuth from "@/hooks/useAuth";
import { NominationFormSubmissionDetails, StaffData } from "@/interfaces";
import { fetchStaff } from "@/lib/nominations";
import { filterInvalidStaffRanksForNomination } from "@/utils";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface AutoCompleteFieldProps {
  control: Control<Omit<NominationFormSubmissionDetails, "files">>;
  disabled?: boolean;
}

export default function Asynchronous({
  control,
  disabled,
}: AutoCompleteFieldProps) {
  const { user } = useAuth();

  const [inputValue, setInputValue] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState<StaffData[] | []>([]);
  const dept = useWatch({ control, name: "department" });

  const debounceOnChange = useDebouncedCallback((value) => {
    setInputSearch(value);
  }, 150);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(value: string) {
    setInputValue(value);
    debounceOnChange(value);
  }

  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      const response = await fetchStaff(inputSearch, "");
      const filteredStaff = filterInvalidStaffRanksForNomination(
        response,
        user?.staff_id
      );
      setLoading(false);

      if (filteredStaff) {
        console.log(filteredStaff);
        setOptions(filteredStaff);
      }
    };
    if (open) {
      fetchStaffData();
    }
  }, [inputSearch, open, user?.staff_id]);

  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      const response = await fetchStaff("", dept === "All" ? "" : dept);
      const filteredStaff = filterInvalidStaffRanksForNomination(
        response,
        user?.staff_id
      );
      setLoading(false);

      if (filteredStaff) {
        console.log(filteredStaff);
        setOptions(filteredStaff);
      }
    };
    fetchStaffData();
  }, [dept, user?.staff_id]);

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
          isOptionEqualToValue={(option, value) =>
            option.staff_id === value.staff_id
          }
          getOptionLabel={(option) => option.staff_name}
          options={options}
          loading={loading}
          inputValue={inputValue}
          includeInputInList
          fullWidth
          disabled={disabled}
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
              onChange={(event: any) => handleChange(event.target.value)}
              required
            />
          )}
          {...field}
          ref={field.ref}
          onChange={(e: any, value) =>
            value && setInputValue(value?.staff_name)
          }
        />
      )}
      name="user"
      control={control}
    />
  );
}
