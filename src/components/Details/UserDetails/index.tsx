import DetailBox, { DetailAttribute } from "../../Common/DetailBox";

interface UserDetailProps {
  title: string;
  name: string;
  designation: string;
  department?: string | undefined;
  loading?: boolean;
  team?: string | undefined;
}

export default function index(props: UserDetailProps) {
  const { title, name, designation, department, loading, team } = props;
  const data: DetailAttribute[] = [
    {
      title: "name",
      text: name,
    },
    {
      title: "designation",
      text: designation,
    },
    {
      title: "department",
      text: department,
    },
    {
      title: "team",
      text: team,
    },
  ];
  return <DetailBox title={title} data={data} loading={loading} />;
}
