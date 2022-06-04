import { ServiceLevel } from "@/enums";
import DetailBox, { DetailAttribute } from "../Common/DetailBox";

interface CommitteeDetailProps {
  title: string;
  final_score?: number;
  final_service_level?: ServiceLevel;
  is_service_level_winner: boolean;
  is_champion_shortlist_result: boolean;
  is_champion_result: boolean;
}

export default function index(props: CommitteeDetailProps) {
  const {
    title,
    final_score,
    final_service_level,
    is_service_level_winner,
    is_champion_shortlist_result,
    is_champion_result,
  } = props;
  const data: DetailAttribute[] = [
    {
      title: "final score",
      text: final_score?.toString(),
    },
    {
      title: "final service level",
      text: ServiceLevel[final_service_level!].toString(),
    },
    {
      title: "service level award winner",
      text: is_service_level_winner ? "Winner" : "",
    },
    {
      title: "championship status",
      text: is_champion_shortlist_result
        ? "Shortlisted"
        : is_champion_result
        ? "Champion"
        : "",
    },
  ];
  return <DetailBox title={title} data={data} />;
}
