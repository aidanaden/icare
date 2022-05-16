import DetailBox, { DetailAttribute } from "../Common/DetailBox";

interface UserDetailProps {
  title: string;
  name: string;
  designation: string;
  department?: string | undefined;
}

export default function index(props: UserDetailProps) {
  const { title, name, designation, department } = props;
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
  ];
  return <DetailBox title={title} data={data} />;
}
