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
import { SendTokenThunk, signUpThunk } from "@/redux/auth/controller";

const SignUpModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.auth?.loading);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    username: yup
      .string()
      .required("This field is required")
      .max(14, "Length must between 5 to 14")
      .min(5, "Length must between 5 to 14"),
    password: yup.string().required("This field is required"),
    conformPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Password and conform password must be same"
      ),
  });

  const formMethods = useForm({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const { handleSubmit, reset, getValues } = formMethods;

  const submitForm = handleSubmit(
    (data) => {
      store
        .dispatch(
          signUpThunk({
            email: data.email,
            password: data.password,
            username: data.username,
          })
        )
        .then((e: any) => {
          console.log(e);
          if (e.success) {
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
      isOpen={state == "signUp"}
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
            <ModalBody className="gap-6 pt-0">
              <FormTextField
                name="username"
                inputProps={{
                  label: "User Name",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  variant: "bordered",
                  color: "primary",
                }}
              />
              {/* <FormTextField
                name="code"
                inputProps={{
                  label: "Verification Code",
                  type: "number",
                  placeholder: "Enter verification code",
                  endContent: (
                    <Button
                      disabled={loading}
                      isLoading={loading}
                      onClick={(e) => {
                        const email = getValues("email");
                        if (email && email.length > 0) {
                          store.dispatch(
                            SendTokenThunk({
                              email: email || "",
                              type: 1,
                            })
                          );
                        } else {
                          store.dispatch(
                            showErrorThunk("Please fill your email address")
                          );
                        }
                      }}
                      color="primary"
                      className="h-full w-36"
                    >
                      Send Code
                    </Button>
                  ),
                }}
              /> */}
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
                  Sign Up
                </Button>
                <p className=" text-center text-sm py-3">
                  {"Already Registered?"}{" "}
                  <span
                    onClick={() => {
                      store.dispatch(changeModelStatus("signIn"));
                    }}
                    className="cursor-pointer text-primary hover:underline ml-1 font-bold"
                  >
                    Login
                  </span>
                </p>
              </div>
            </ModalBody>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModel;
