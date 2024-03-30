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
      onClose={() => {
        store.dispatch(closeModel());
        reset({});
      }}
    >
      <ModalContent>
        <FormProvider {...formMethods}>
          <form onSubmit={submitForm}>
            <ModalBody>
              <h6 className="text-xl pt-5 pb-3 font-medium">
                Forget Password
              </h6>
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  placeholder: "Enter your email",
                }}
              />
              <FormTextField
                name="code"
                inputProps={{
                  label: "Verification Code",
                  type: "number",
                  placeholder: "Enter verification code",
                  endContent: (
                    <Button 
                    isLoading={loading}
                    onClick={()=>{
                      store.dispatch(
                        SendTokenThunk({
                          email: getValues("email") || "",
                          type: 2,
                        })
                      );
                    }} color="primary" className="h-full w-36">
                      Send Code
                    </Button>
                  ),
                }}
              />
              <FormPasswordField
                name="password"
                inputProps={{
                  label: "Password",
                  placeholder: "Create new password",
                }}
              />
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

export default ForgetPasswordModel;
