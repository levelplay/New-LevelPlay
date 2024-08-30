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
import { closeModel } from "@/redux/model/controller";
import FormTextField from "../input/FormTextField";
import FormPasswordField from "../input/FormPasswordField";
import { SendTokenThunk, forgetPasswordThunk } from "@/redux/auth/controller";

const ForgetPasswordModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.auth?.loading);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
    code: yup.string().length(6, "Code must be 6 digit"),
  });

  const formMethods = useForm({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const { handleSubmit, reset, getValues } = formMethods;

  const submitForm = handleSubmit(
    async (data) => {
      const result = await store.dispatch(forgetPasswordThunk(data));
      if (result.success) {
        store.dispatch(closeModel());
      }
    },
    () => {
      store.dispatch(showErrorThunk("Please resolve errors"));
    }
  );

  return (
    <Modal
      isOpen={state == "forget-password"}
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
              <h6 className="text-3xl font-bold">Forget Password</h6>
              <p className="text-base font-normal">Glad you’re back.!</p>
            </ModalHeader>
            <ModalBody className="gap-6 pt-0">
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              <FormTextField
                name="code"
                inputProps={{
                  label: "Verification Code",
                  type: "number",
                  variant: "bordered",
                  color: "primary",
                  endContent: (
                    <Button
                      isLoading={loading}
                      onClick={() => {
                        store.dispatch(
                          SendTokenThunk({
                            email: getValues("email") || "",
                            type: 2,
                          })
                        );
                      }}
                      color="primary"
                      className="h-full w-36"
                    >
                      Send Code
                    </Button>
                  ),
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
              <FormPasswordField
                name="conformPassword"
                inputProps={{
                  label: "Conform Password",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              <div className="w-full flex flex-col gap-6 pb-10 pt-8">
                <Button
                  isLoading={loading}
                  color="primary"
                  type="submit"
                  size="lg"
                  fullWidth
                >
                  Change Password
                </Button>
              </div>
            </ModalBody>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default ForgetPasswordModel;
