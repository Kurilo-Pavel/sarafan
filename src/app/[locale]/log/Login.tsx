"use client";
import "../styles/log.css";
import {Field, Form, Formik} from "formik";
import Button from "../components/Button";
import {emailCheck, passwordCheck} from "@/src/app/[locale]/script.mjs";
import Email from "../components/Email";
import Password from "../components/Password";
import {login, resetError, resetMessage} from "../store/user/userSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import {Link, useRouter} from "@/src/navigation";
import {RootState} from "@/src/app/[locale]/store";
import Modal from "@/src/app/[locale]/components/Modal";
import {useLocale} from "next-intl";
import password from "@/src/app/[locale]/components/Password";

type LoginProps = {
  data:{
    errorEmail: string;
    errorPassword: string;
    title: string;
    email: string;
    password: string;
    button: string;
    registration: string;
    forgotPassword: string;
  }
};

export interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

const LogIn = ({data}:LoginProps) => {

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useRouter();
  const locale = useLocale();
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
      navigate.replace("/", {locale: locale});
    }
  }, [user.message, user.error, user.user.token, dispatch, navigate]);

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
            <h1>{data.title}</h1>
            <Field
              name="email"
              component={Email}
              placeholder={data.email}
              className="log_input"
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Field
              name="password"
              component={Password}
              placeholder={data.password}
              error={touched.password ? errors.password : undefined}
            />
            <Button text={data.button} type="submit" className="contact_feedback_button"/>
            <div className="log_alternative">
              <Link href={"/registration" as "/"} locale={locale} className="log_link">{data.registration}</Link>
              <span className="alternative_slash"> / </span>
              <Link href={"/forgotPassword" as "/"} locale={locale} className="log_link">{data.forgotPassword}</Link>
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