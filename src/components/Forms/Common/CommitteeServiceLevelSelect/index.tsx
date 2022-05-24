import { ServiceLevel } from "@/enums";
import FormSelect from "../FormSelect";

interface CommitteeServiceLevelSelectProps {
  control: any;
}

export default function CommitteeServiceLevelSelect({
  control,
}: CommitteeServiceLevelSelectProps) {
  const committeeServiceLevelData = Object.values(ServiceLevel)
    .filter((value) => isNaN(Number(value)))
    .map((k) => {
      return {
        label: k.toString(),
        value: ServiceLevel[k as ServiceLevel],
      };
    });
  return (
    <>
      <FormSelect
        control={control}
        name="service_level"
        label="Service level"
        defaultValue={ServiceLevel.BASIC}
        data={committeeServiceLevelData}
      />
    </>
  );
}
