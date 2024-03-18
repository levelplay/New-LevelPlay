import { TextAreaProps, Textarea } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
interface DataModel {
  name: string;
  inputProps: TextAreaProps;
  className?: string;
}

export const FormTextarea: FC<DataModel> = ({
  name,
  inputProps,
  className,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isError = errors?.[name]?.message ? true : false;
  const errorMessage = errors?.[name]?.message ? errors?.[name]?.message : "";

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            variant="flat"
            labelPlacement="inside"
            aria-label={name}
            minRows={4}
            maxRows={6}
            errorMessage={errorMessage == "" ? undefined : <>{errorMessage}</>}
            isInvalid={isError}
            {...field}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};
