import { useEffect, useState } from "react";
import { Control, Controller, useWatch } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useDebouncedCallback } from "use-debounce";

import StyledTextField from "@/components/Common/StyledTextField";
import useAuth from "@/hooks/useAuth";
import { NominationFormSubmissionDetails, StaffData } from "@/interfaces";
import { fetchStaff, useStaff } from "@/lib/nominations";
import { filterInvalidStaffRanksForNomination } from "@/utils";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";
import { newNominationFormState } from "@/atoms/newNominationFormAtom";

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
  const selectedUser = useWatch({ control, name: "user" });
  const selectedDept = useWatch({ control, name: "department" });

  const [getNominationFormState, setNominationFormState] = useRecoilState(
    disabled ? editNominationFormState : newNominationFormState
  );
  const [inputValue, setInputValue] = useState<string | undefined>(
    selectedUser?.staff_name
  );
  const [inputSearch, setInputSearch] = useState("");
  const [options, setOptions] = useState<StaffData[] | []>([]);

  const debounceOnChange = useDebouncedCallback((value) => {
    setInputSearch(value);
  }, 150);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { staffData } = useStaff(inputSearch, selectedDept);
  const filteredStaffData = filterInvalidStaffRanksForNomination(
    staffData,
    user?.staff_id
  );
  // console.log("filtered staff data from hook: ", filteredStaffData);

  function handleChange(value: string) {
    console.log("calling handle change for textField");
    setInputValue(value);
    debounceOnChange(value);
  }

  // fetch staff data on search input change
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
        setOptions(filteredStaff);
      }
    };
    if (open && inputSearch.length > 0) {
      fetchStaffData();
    }
  }, [inputSearch, open, user?.staff_id]);

  // fetch staff data when dept change
  useEffect(() => {
    const fetchStaffData = async () => {
      setLoading(true);
      const response = await fetchStaff(
        "",
        selectedDept === "All" ? "" : selectedDept
      );
      const filteredStaff = filterInvalidStaffRanksForNomination(
        response,
        user?.staff_id
      );
      setLoading(false);

      if (filteredStaff) {
        setOptions(filteredStaff);
      }
    };
    // setInputValue("");
    fetchStaffData();
  }, [selectedDept, user?.staff_id]);

  // update nomination form state with selected staff data
  const handleOnChange = (e: any, value: StaffData | null) => {
    console.log("calling handle change for autocomplete");
    if (!value) {
      console.log("resetting input value!");
      setInputValue("");
      return;
    }
    setInputValue(value?.staff_name);
    const selectedUser = options.find(
      (user) => user.staff_name === value.staff_name
    );
    const newFormData = {
      ...getNominationFormState,
      user: selectedUser,
      department: selectedDept,
    };
    setNominationFormState(newFormData);
  };

  useEffect(() => {
    setInputValue(selectedUser?.staff_name);
  }, [selectedUser]);

  useEffect(() => {
    console.log("input value: ", inputValue);
  }, [inputValue]);

  useEffect(() => {
    console.log("dept value: ", selectedDept);
  }, [selectedDept]);

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
          options={!loading ? options : []}
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
                    {loading && open ? (
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
          onChange={handleOnChange}
        />
      )}
      name="user"
      control={control}
    />
  );
}
