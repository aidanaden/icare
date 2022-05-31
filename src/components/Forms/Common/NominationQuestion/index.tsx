import { NominationQuestionAnswerData } from "@/interfaces";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { RadioButtonGroup } from "react-hook-form-mui";

interface NominationQuestion {
  question: string;
  answers: NominationQuestionAnswerData[];
}

export default function NominationQuestion({
  question,
  answers,
}: NominationQuestion) {
  console.log("anwers: ", answers);
  const options = answers.map(({ answer_id, answer_name }) => {
    return { id: `${answer_id}`, label: answer_name };
  });
  return (
    <RadioButtonGroup
      label={question}
      name={question}
      options={options}
      required
    />
    // <Stack direction="column" spacing={1}>
    // {/* <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel> */}

    // {/* <RadioGroup
    //   aria-labelledby="demo-radio-buttons-group-label"
    //   defaultValue="female"
    //   name="radio-buttons-group"
    // >
    //   {answers.map((answer, i) => (
    //     <FormControlLabel
    //       key={`answer ${i} to ${question}`}
    //       value={answer}
    //       control={<Radio />}
    //       label={answer}
    //     />
    //   ))}
    // </RadioGroup> */}
    // </Stack>
  );
}
