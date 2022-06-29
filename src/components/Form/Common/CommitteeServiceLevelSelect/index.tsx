import { ServiceLevel } from "@/enums";
import FormSelect from "../FormSelect";

interface CommitteeServiceLevelSelectProps {
  control: any;
  defaultServiceLevel: ServiceLevel;
}

export default function CommitteeServiceLevelSelect({
  control,
  defaultServiceLevel,
}: CommitteeServiceLevelSelectProps) {
  const committeeServiceLevelData = Object.values(ServiceLevel)
    .filter((value) => isNaN(Number(value)))
    .map((k) => {
      return {
        label: k.toString(),
        value: ServiceLevel[k as ServiceLevel],
      };
    })
    .filter(({ label, value }) => label.toLowerCase() !== "pending");
  return (
    <>
      <FormSelect
        control={control}
        name="service_level"
        label="Service level"
        defaultValue={defaultServiceLevel}
        data={committeeServiceLevelData}
      />
    </>
  );
}
