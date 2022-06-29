import { EndorsementStatus } from "@/enums";
import FormSelect from "../FormSelect";

interface EndorsementStatusSelectProps {
  control: any;
}

export default function EndorsementStatusSelect({
  control,
}: EndorsementStatusSelectProps) {
  const endorsementStatusData = Object.values(EndorsementStatus)
    .filter((value) => isNaN(Number(value)))
    .map((k) => {
      return {
        label: k.toString(),
        value: EndorsementStatus[k as EndorsementStatus],
      };
    })
    .filter(({ label, value }) => label.toLowerCase() !== "pending");
  return (
    <>
      <FormSelect
        control={control}
        name="endorsement_status"
        label="Endorsement"
        defaultValue={EndorsementStatus.NEUTRAL}
        data={endorsementStatusData}
      />
    </>
  );
}
