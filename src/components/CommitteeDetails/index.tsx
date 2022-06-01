import { ServiceLevel } from "@/enums";
import DetailBox, { DetailAttribute } from "../Common/DetailBox";

interface CommitteeDetailProps {
  title: string;
  final_score?: number;
  final_service_level?: ServiceLevel;
}

export default function index(props: CommitteeDetailProps) {
  const { title, final_score, final_service_level } = props;
  const data: DetailAttribute[] = [
    {
      title: "final score",
      text: final_score?.toString(),
    },
    {
      title: "final service level",
      text: ServiceLevel[final_service_level!].toString(),
    },
  ];
  return <DetailBox title={title} data={data} />;
}
