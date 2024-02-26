"use client";
import "../styles/log.css";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {emailCheck, passwordCheck} from "@/src/app/[locale]/script.mjs";
import Email from "../components/Email";
import Password from "../components/Password";
import Checkbox from "../components/Checkbox";
import {registration, resetError, resetMessage} from "../store/user/userSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import {RootState} from "@/src/app/[locale]/store";
import Modal from "@/src/app/[locale]/components/Modal";

type RegistrationProps={
  data:{
    errorEmail: string;
    errorPassword: string;
    errorPasswords: string;
    errorRules: string;
    title: string;
    email: string;
    password: string;
    repeatPassword: string;
    inform: string;
    button: string;
  }
}
interface FormValues {
  email: string;
  password: string;
  repPassword: string;
  rules: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Registration = ({data}:RegistrationProps) => {

  const initialValues: FormValues = {
    email: "",
    password: "",
    repPassword: "",
    rules: false,
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

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
      setIsModal(true)
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
        if (!passwordCheck(values.password)) {
          errors.password = data.errorPassword;
        }
        if (values.password !== values.repPassword) {
          errors.repPassword = data.errorPasswords;
        }
        if (!values.rules) {
          errors.rules = data.errorRules;
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        setEmail(values.email);
        dispatch(resetError());
        dispatch(resetMessage());
        dispatch(registration(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>{data.title}</h1>
            <Field
              name="email"
              component={Email}
              className="log_input"
              placeholder={data.email}
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Field
              name="password"
              component={Password}
              placeholder={data.password}
              error={touched.password ? errors.password : undefined}
            />
            <Field
              name="repPassword"
              component={Password}
              placeholder={data.repeatPassword}
              error={touched.repPassword ? errors.repPassword : undefined}
            />
            <Field
              name="rules"
              text={data.inform}
              component={Checkbox}
              error={touched.rules ? errors.rules : undefined}

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
export default Registration;