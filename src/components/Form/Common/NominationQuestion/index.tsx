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
import { newNominationFormState } from "@/atoms/newNominationFormAtom";
import { editNominationFormState } from "@/atoms/editNominationFormAtom";

interface NominationQuestion {
  control: any;
  question: string;
  questionName: string;
  answers: NominationQuestionAnswerData[];
  isEdit?: boolean;
  getValues?: () => any;
}

export default function NominationQuestion({
  control,
  question,
  questionName,
  answers,
  isEdit,
  getValues,
}: NominationQuestion) {
  const [getNominationFormState, setNominationFormState] = useRecoilState(
    isEdit ? editNominationFormState : newNominationFormState
  );

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
        render={({ field }) => {
          const radioGroupValue = field.value === undefined ? "" : field.value;
          return (
            <RadioGroup
              name={field.name}
              onBlur={field.onBlur}
              ref={field.ref}
              value={radioGroupValue}
              onChange={(e: any, value: any) => {
                onChange(e, value);
                field.onChange(value);
              }}
            >
              {answers.map((ans) => (
                <FormControlLabel
                  key={`answer ${ans.answer_id}`}
                  value={ans.answer_id}
                  control={<Radio />}
                  label={ans.answer_name}
                />
              ))}
            </RadioGroup>
          );
        }}
      />
      {errors[questionName] && (
        <FormHelperText error={errors[questionName] !== null}>
          Answer to this question is required.
        </FormHelperText>
      )}
    </FormControl>
  );
}
