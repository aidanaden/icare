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
  answers: string[];
}

export default function NominationQuestion({
  question,
  answers,
}: NominationQuestion) {
  const options = answers.map((answer, i) => {
    return { id: `${i}`, label: answer };
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
