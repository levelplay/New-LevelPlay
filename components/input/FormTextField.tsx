"use client";
import { Input, InputProps } from "@nextui-org/react";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
interface DataModel {
  inputProps?: InputProps;
  name: string;
  className?: string;
}

const FormTextField: FC<DataModel> = ({ name, inputProps, className }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const isError = errors?.[name]?.message ? true : false;
  const errorMessage = errors?.[name]?.message ? errors?.[name]?.message : "";

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            variant="flat"
            labelPlacement="inside"
            aria-label={name}
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

export default FormTextField;
