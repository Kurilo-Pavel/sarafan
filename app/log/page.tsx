"use client";
import "../styles/log.css";
import {Field, Form, Formik} from "formik";
import Button from "../components/Button";
import {useRouter} from 'next/navigation'
import {emailCheck, passwordCheck} from "../script";
import Email from "../components/Email";
import Password from "../components/Password";
import {login, resetError, resetMessage} from "../store/user/userSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import Link from "next/link";
import {RootState} from "@/app/store";
import Modal from "@/app/components/Modal";

export interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

const LogIn = () => {

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useRouter();

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
     setIsModal(true);
    }
    if (user.user.token) {
      navigate.push("/");
    }
  }, [user.message, user.error, user.user.token, dispatch, navigate]);

  const cancelHande = ()=>{
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
          errors.email = "Некорректный Email";
        }
        if (!passwordCheck(values.password)) {
          errors.password = "Некорректный пароль";
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        setEmail(values.email);
        dispatch(resetError());
        dispatch(resetMessage());
        dispatch(login(values));
      }}>

      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>Вход</h1>
            <Field
              name="email"
              component={Email}
              placeholder="Введите Email"
              className="log_input"
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Field
              name="password"
              component={Password}
              placeholder="Введите пароль"
              error={touched.password ? errors.password : undefined}
            />
            <Button text="Войти" type="submit" className="contact_feedback_button"/>
            <div className="log_alternative">
              <Link href="/registration" className="log_link">Регистрация</Link>
              <span className="alternative_slash"> / </span>
              <Link href="/forgotPassword" className="log_link">Забыли пароль?</Link>
            </div>
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
export default LogIn;