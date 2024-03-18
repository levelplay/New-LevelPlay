"use client";
import { Input, InputProps } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

interface DataModel {
  inputProps?: InputProps;
  name: string;
  className?: string;
}

const FormPasswordField: FC<DataModel> = ({ name, inputProps, className }) => {
  const [showPassword, setShowPassword] = useState(false);
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
            type={showPassword ? "text" : "password"}
            isInvalid={isError}
            endContent={
              <div
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            }
            {...field}
            {...inputProps}
          />
        )}
      />
    </div>
  );
};

export default FormPasswordField;
