import { FormControl, FormLabel, Switch, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormSwitchProps {
  label: string;
  name: string;
  control: any;
  error?: string;
}

export default function FormSwitch({
  label,
  name,
  control,
  error,
}: FormSwitchProps) {
  return (
    <FormControl sx={{ width: { xs: "full", sm: "240px" } }}>
      <FormLabel
        component="legend"
        id={`${name}-simple-switch-helper-label`}
        // sx={{ color: "black" }}
        sx={{
          mb: 1,
          fontWeight: 600,
          fontSize: "12px",
          color: "#8C9AA6",
          textTransform: "uppercase",
          letterSpacing: 0.25,
        }}
      >
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
            }}
            // checked={props.value}
          />
        )}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
