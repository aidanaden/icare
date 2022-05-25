import DetailBox, { DetailAttribute } from "../Common/DetailBox";

interface CommitteeDetailProps {
  title: string;
  final_score: string;
  final_service_level: string;
}

export default function index(props: CommitteeDetailProps) {
  const { title, final_score, final_service_level } = props;
  const data: DetailAttribute[] = [
    {
      title: "final score",
      text: final_score,
    },
    {
      title: "final service level",
      text: final_service_level,
    },
  ];
  throw new Error("committee details error!");
  return <DetailBox title={title} data={data} />;
}
