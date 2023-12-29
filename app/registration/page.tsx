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
import {registration} from "../store/user/userSlice";
import {useAppDispatch} from "../store/hooks";

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
const dispatch = useAppDispatch();

  const initialValues: FormValues = {
    email: "",
    password: "",
    repPassword: "",
    rules: false,
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
        if (values.password !== values.repPassword) {
          errors.repPassword = "Passwords do not match";
        }
        if (!values.rules) {
          errors.rules = "you must agree to the rules";
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
     dispatch(registration(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1>Регистрация</h1>
            <Field
              name="email"
              component={Email}
              error={touched.email ? errors.email : undefined}
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
            />
            <Button type="submit" text="Зарегистрироваться" className="contact_feedback_button"/>
          </Form>);
      }}
    </Formik>
  </div>
};
export default Registration;