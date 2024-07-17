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
import { SendTokenThunk, signUpThunk } from "@/redux/auth/controller";

const SignUpModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);
  const loading = useSelector((e: RootReducerType) => e?.auth?.loading);
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required")
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
      onClose={() => {
        store.dispatch(closeModel());
        reset({});
      }}
    >
      <ModalContent>
        <FormProvider {...formMethods}>
          <form onSubmit={submitForm}>
            <ModalBody>
              <h6 className="text-xl pt-5 pb-3 font-medium">Sign Up</h6>
              <FormTextField
                name="username"
                inputProps={{
                  label: "User Name",
                  placeholder: "Enter your user name",
                }}
              />
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
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
                  placeholder: "Create your password",
                }}
              />
            </ModalBody>
            <ModalFooter className="flex-col">
              <Button
                isLoading={loading}
                color="primary"
                type="submit"
                className="my-2"
                fullWidth
              >
                Continue
              </Button>
              <p className=" text-center text-sm py-3">
                {"Already have an account?"}{" "}
                <span
                  onClick={() => {
                    store.dispatch(changeModelStatus("signIn"));
                  }}
                  className="cursor-pointer text-primary hover:underline"
                >
                  Sign In
                </span>
              </p>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModel;
