"use client";
import * as yup from "yup";
import React from "react";
import { RootReducerType, store } from "@/redux/store";
import { showErrorThunk } from "@/redux/toast/controller";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { changeModelStatus, closeModel } from "@/redux/model/controller";
import FormTextField from "../input/FormTextField";
import FormPasswordField from "../input/FormPasswordField";
import { LoginThunk } from "@/redux/auth/controller";

const SignInModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.auth?.loading);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
  });

  const formMethods = useForm({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const { handleSubmit, reset } = formMethods;

  const submitForm = handleSubmit(
    (data) => {
      store.dispatch(LoginThunk(data)).then((result: any) => {
        if (result.success) {
          store.dispatch(closeModel());
        }
      });
    },
    () => {
      store.dispatch(showErrorThunk("Please resolve errors"));
    }
  );

  return (
    <Modal
      isOpen={state == "signIn"}
      backdrop="blur"
      onClose={() => {
        store.dispatch(closeModel());
        reset({});
      }}
    >
      <ModalContent className="border border-black dark:border-white">
        <FormProvider {...formMethods}>
          <form onSubmit={submitForm}>
            <ModalHeader className="pb-8 pt-16 gap-2 flex-col">
              <h6 className="text-4xl font-bold">Sign In</h6>
              <p className="text-base font-normal">Glad you’re back.!</p>
            </ModalHeader>
            <ModalBody className="gap-[30px] pt-0">
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              <FormPasswordField
                name="password"
                inputProps={{
                  label: "Password",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              <div className="w-full flex flex-col gap-3 pt-8">
                <Button
                  isLoading={loading}
                  color="primary"
                  type="submit"
                  size="lg"
                  fullWidth
                >
                  Sign In
                </Button>
                <p
                  className="text-base text-center cursor-pointer hover:underline"
                  onClick={() => {
                    store.dispatch(changeModelStatus("forget-password"));
                  }}
                >
                  Forgot password?
                </p>
              </div>
            </ModalBody>
            <ModalFooter className="flex-col pt-12 pb-16">
              <p className=" text-center text-base">
                Don’t have an account ?
                <span
                  onClick={() => {
                    store.dispatch(changeModelStatus("signUp"));
                  }}
                  className="cursor-pointer text-primary hover:underline ml-1 font-bold"
                >
                  Sign Up
                </span>
              </p>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default SignInModel;
