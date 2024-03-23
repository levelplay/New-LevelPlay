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
      store.dispatch(LoginThunk(data)).then((result: any)=>{
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
      onClose={() => {
        store.dispatch(closeModel());
        reset({});
      }}
    >
      <ModalContent>
        <FormProvider {...formMethods}>
          <form onSubmit={submitForm}>
            <ModalBody>
              <h6 className="text-xl pt-5 pb-3 font-medium">Sign in</h6>
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
                }}
              />
              <div className="flex flex-col gap-2 pb-1">
                <FormPasswordField
                  name="password"
                  inputProps={{
                    label: "Password",
                    placeholder: "Enter your password",
                  }}
                />
                <div className="flex px-2 justify-between">
                  <div />
                  <p
                    className="opacity-80 text-xs cursor-pointer hover:underline"
                    onClick={() => {
                      store.dispatch(changeModelStatus("forget-password"));
                    }}
                  >
                    Forgot password?
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} color="primary" type="submit" className="my-2" fullWidth>
                Continue
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default SignInModel;
