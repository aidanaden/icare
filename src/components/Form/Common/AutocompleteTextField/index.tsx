import { useCallback, useEffect, useState } from "react";
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
  const selectedDescription = useWatch({ control, name: "description" });

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

  // handle search text change
  function handleChange(value: string) {
    setInputValue(value);
    debounceOnChange(value);
  }

  const fetchStaffData = useCallback(async () => {
    setLoading(true);
    const response = await fetchStaff(
      inputSearch,
      selectedDept?.includes("All") ? "" : selectedDept
    );
    const filteredStaff = filterInvalidStaffRanksForNomination(
      response,
      user?.staff_id
    )?.sort((a, b) => a.staff_name.localeCompare(b.staff_name));
    setOptions(filteredStaff ?? []);
    setLoading(false);
  }, [inputSearch, selectedDept, user?.staff_id]);

  // fetch staff data on search input change
  useEffect(() => {
    if (open) {
      fetchStaffData();
    }
  }, [inputSearch]);

  // fetch staff data when dept change
  useEffect(() => {
    fetchStaffData();
  }, [selectedDept]);

  // update nomination form state with selected staff data
  const handleOnChange = (e: any, value: StaffData | null) => {
    if (!value) {
      setInputSearch("");
      setInputValue("");
      const newFormData = {
        ...getNominationFormState,
        user: {
          staff_corporate_rank: "",
          staff_department: "",
          staff_id: "",
          staff_name: "",
        },
        department: "All",
      };
      setNominationFormState(newFormData);
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
      description: selectedDescription,
    };
    console.log("new form data onchange: ", { newFormData });
    setNominationFormState(newFormData);
  };

  useEffect(() => {
    setInputValue(selectedUser?.staff_name);
  }, [selectedUser]);

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            if (
              selectedUser?.staff_name === "" &&
              selectedUser.staff_name !== inputValue
            ) {
              // clear input value if input value
              // was set from user typing in field
              setInputValue("");
              setInputSearch("");
            }
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
