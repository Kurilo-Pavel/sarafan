"use client";
import "../styles/log.css";
import {Field, Form, Formik} from "formik";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import {emailCheck, passwordCheck} from "../script";
import Email from "../components/Email";
import Password from "../components/Password";
import {login} from "../store/user/userSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect} from "react";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

const LogIn = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.login.user.token);
  const navigate = useRouter();

  useEffect(() => {
    if (token) {
      navigate.push("/");
    }
  }, [token]);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  return <div className="log_wrapper">
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (!emailCheck(values.email)) {
          errors.email = "incorrect email";
        }
        if (!passwordCheck(values.password)) {
          errors.password = "incorrect password";
        }
        return errors;
      }}
      onSubmit={async (values: FormValues) => {
        dispatch(login(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>Вход</h1>
            <Field
              name="email"
              component={Email}
              error={touched.email ? errors.email : undefined}
            />
            <Field
              name="password"
              component={Password}
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
  </div>
};
export default LogIn;