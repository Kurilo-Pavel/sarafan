"use client";
import "../styles/log.css";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {emailCheck} from "@/src/app/[locale]/script.mjs";
import Email from "../components/Email";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {resetError, resetMessage, updatePassword} from "@/src/app/[locale]/store/user/userSlice";
import {useEffect, useState} from "react";
import {RootState} from "@/src/app/[locale]/store";
import Modal from "@/src/app/[locale]/components/Modal";

type ForgotPasswordProps = {
  data: {
    errorEmail: string;
    title: string;
    inform: string;
    email: string;
    button: string;
  }
}

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

const ForgotPassword = ({data}: ForgotPasswordProps) => {

  const initialValues: FormValues = {
    email: "",
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const [isModal, setIsModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.error) {
      dispatch(resetError());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user.error) {
      setError(user.error);
    } else {
      setError("");
    }
    if (user.message) {
      setIsModal(true);
    }
  }, [user.error, user.message, dispatch]);

  const cancelHande = () => {
    dispatch(resetMessage());
  };

  return <div className="log_wrapper">
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (email !== values.email) {
          setError("");
        }
        if (!emailCheck(values.email)) {
          errors.email = data.errorEmail;
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        setEmail(values.email);
        dispatch(resetError());
        dispatch(resetMessage());
        dispatch(updatePassword(values.email));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>{data.title}</h1>
            <p className="log_text">
              {data.inform}
            </p>
            <Field
              name="email"
              component={Email}
              placeholder={data.email}
              className="log_input"
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Button type="submit" text={data.button} className="contact_feedback_button"/>
          </Form>);
      }}
    </Formik>
    {isModal && <Modal
      title={user.message}
      isInform={true}
      setIsModal={setIsModal}
      cancelHandle={cancelHande}
    />}
  </div>
};
export default ForgotPassword;