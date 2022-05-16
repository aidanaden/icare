import DetailBox, { DetailAttribute } from "../Common/DetailBox";

interface CommitteeMemberDetailProps {
  title: string;
  service_level: string;
  feedback: string;
}

export default function index(props: CommitteeMemberDetailProps) {
  const { title, service_level, feedback } = props;
  const data: DetailAttribute[] = [
    {
      title: "service_level",
      text: service_level,
    },
    {
      title: "feedback",
      text: feedback,
      isMultiLine: true,
    },
  ];
  return <DetailBox title={title} data={data} isColumn />;
}
