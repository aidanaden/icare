import { nominationFormState } from "@/atoms/nominationFormAtom";
import { NominationQuestionAnswerData } from "@/interfaces";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, useFormState } from "react-hook-form";
import { useRecoilState } from "recoil";

interface NominationQuestion {
  control: any;
  question: string;
  questionName: string;
  answers: NominationQuestionAnswerData[];
}

export default function NominationQuestion({
  control,
  question,
  questionName,
  answers,
}: NominationQuestion) {
  const [getNominationFormState, setNominationFormState] =
    useRecoilState(nominationFormState);

  const { errors } = useFormState({ control });

  const onChange = (e: any, value: any) => {
    const newAnswerMap = getNominationFormState.answers.set(
      questionName,
      value
    );
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
        name={questionName}
        render={({ field }) => (
          <RadioGroup
            {...field}
            onChange={(e: any, value: any) => {
              onChange(e, value);
              field.onChange(value);
            }}
          >
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
      {errors[questionName] && (
        <FormHelperText error={errors[questionName] !== null}>
          Answer to this question is required.
        </FormHelperText>
      )}
    </FormControl>
  );
}
