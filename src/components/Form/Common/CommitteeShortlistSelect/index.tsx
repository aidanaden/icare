import { ShortlistStatus } from "@/enums";
import FormSelect from "../FormSelect";

interface CommitteeShortlistSelectProps {
  control: any;
}

export default function CommitteeShortlistSelect({
  control,
}: CommitteeShortlistSelectProps) {
  const committeeShortlistData = Object.values(ShortlistStatus)
    .filter((value) => isNaN(Number(value)))
    .map((k) => {
      return {
        label: k.toString(),
        value: ShortlistStatus[k as ShortlistStatus],
      };
    });
  return (
    <>
      <FormSelect
        control={control}
        name="shortlist_status"
        label="Shortlist status"
        defaultValue={ShortlistStatus.FALSE}
        data={committeeShortlistData}
      />
    </>
  );
}
