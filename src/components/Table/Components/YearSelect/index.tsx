import Select, { SelectProps } from "@/components/Common/Select";

export default function YearSelect({
  values,
  header,
  defaultValue,
  setValueType,
}: SelectProps<string>) {
  return (
    <Select
      header={header}
      values={values}
      defaultValue={defaultValue}
      setValueType={setValueType}
    />
  );
}
