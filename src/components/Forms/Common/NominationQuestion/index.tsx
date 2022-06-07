import { nominationFormState } from "@/atoms/nominationFormAtom";
import { NominationQuestionAnswerData } from "@/interfaces";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { RadioButtonGroup } from "react-hook-form-mui";
import { useRecoilState } from "recoil";

interface NominationQuestion {
  control: any;
  question: string;
  answers: NominationQuestionAnswerData[];
}

export default function NominationQuestion({
  control,
  question,
  answers,
}: NominationQuestion) {
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);

  const onChange = (e: any, value: any) => {
    const newAnswerMap = getNominationFormState.answers.set(question, value);
    setNominationFormState({
      ...getNominationFormState,
      answers: newAnswerMap,
    });
  };

  return (
    <FormControl>
      <FormLabel>{question}</FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        name={question}
        render={({ field }) => (
          <RadioGroup {...field} onChange={onChange}>
            {answers.map((ans) => (
              <FormControlLabel
                key={ans.answer_id}
                value={ans.answer_id}
                control={<Radio />}
                label={ans.answer_name}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
