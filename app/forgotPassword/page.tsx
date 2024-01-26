"use client";
import "../styles/log.css";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {emailCheck} from "../script";
import Email from "../components/Email";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {resetError, resetMessage, updatePassword} from "@/app/store/user/userSlice";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/app/store";
import Modal from "@/app/components/Modal";

interface FormValues {
  email: string;
}

interface FormErrors {
  [key: string]: string;
}

const ForgotPassword = () => {

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
      dispatch(resetError({error: ""}));
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
    dispatch(resetMessage({message: ""}));
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
          errors.email = "Некорректный Email";
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        setEmail(values.email);
        dispatch(resetError({error: ""}));
        dispatch(resetMessage({message: ""}));
        dispatch<AppDispatch>(updatePassword(values.email));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1> Восстановление пароля</h1>
            <p className="log_text">Укажите ваш E-mail, и мы вышлем вам код подтверждения </p>
            <Field
              name="email"
              component={Email}
              placeholder="Email"
              className="log_input"
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Button type="submit" text="Восстановить" className="contact_feedback_button"/>
          </Form>
        );
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