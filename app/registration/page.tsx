"use client";
import "../styles/log.css";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {emailCheck, passwordCheck} from "../script";
import Email from "../components/Email";
import Password from "../components/Password";
import Checkbox from "../components/Checkbox";
import {registration, resetError, resetMessage} from "../store/user/userSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {useEffect, useState} from "react";
import {AppDispatch, RootState} from "@/app/store";
import Modal from "@/app/components/Modal";

interface FormValues {
  email: string;
  password: string;
  repPassword: string;
  rules: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const Registration = () => {

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
      setIsModal(true)
    }
  }, [user.error, user.message, dispatch]);

const cancelHande = ()=>{
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
        if (!passwordCheck(values.password)) {
          errors.password = "Некорректный пароль";
        }
        if (values.password !== values.repPassword) {
          errors.repPassword = "Пароли не соответствуют";
        }
        if (!values.rules) {
          errors.rules = "Вам нужно согласиться с правилами";
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        setEmail(values.email);
        dispatch(resetError({error: ""}));
        dispatch(resetMessage({message: ""}));
        dispatch(registration(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>Регистрация</h1>
            <Field
              name="email"
              component={Email}
              text="Введите E-mail"
              className="log_input"
              placeholder="Введите Email"
              error={touched.email ? errors.email : undefined}
              serverError={error}
            />
            <Field
              name="password"
              component={Password}
              placeholder="Введите пароль"
              error={touched.password ? errors.password : undefined}
            />
            <Field
              name="repPassword"
              component={Password}
              placeholder="Повторите пароль"
              error={touched.repPassword ? errors.repPassword : undefined}
            />
            <Field
              name="rules"
              text="Я согласен с политикой конфиденциальности и с обработкой персональных данных"
              component={Checkbox}
              error={touched.rules ? errors.rules : undefined}

            />
            <Button type="submit" text="Зарегистрироваться" className="contact_feedback_button"/>
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