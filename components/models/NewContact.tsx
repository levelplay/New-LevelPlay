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

const NewContactModel = () => {
  const state = useSelector((e: RootReducerType) => e?.model?.status);

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("This field is required"),
  });

  const formMethods = useForm({
    defaultValues: {},
    resolver: yupResolver(formSchema),
  });

  const { handleSubmit, reset } = formMethods;

  const submitForm = handleSubmit(
    (data) => {},
    () => {
      store.dispatch(showErrorThunk("Please resolve errors"));
    }
  );

  return (
    <Modal
      isOpen={state == "new-contact"}
      onClose={() => {
        store.dispatch(closeModel());
        reset({});
      }}
    >
      <ModalContent>
        <FormProvider {...formMethods}>
          <form onSubmit={submitForm}>
            <ModalBody>
              <h6 className="text-xl pt-5 pb-3 font-medium">Add Contact</h6>
              <FormTextField
                name="email"
                inputProps={{
                  label: "Email",
                  type: "email",
                  placeholder: "Enter user email",
                }}
              />
            </ModalBody>
            <ModalFooter className="flex-col">
              <Button color="primary" type="submit" className="my-2" fullWidth>
                Add Contact
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default NewContactModel;
