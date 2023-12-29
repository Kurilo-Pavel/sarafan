"use client";
import "../styles/log.css";
import {
  Field, Form, Formik
} from "formik";
import Button from "../components/Button";
import {emailCheck} from "../script";
import Email from "../components/Email";

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

  return <div className="log_wrapper">
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (!emailCheck(values.email)) {
          errors.email = "incorrect email";
        }
        return errors;
      }}
      onSubmit={(values: FormValues) => {
        console.log(values);
      }}>
      {({errors, touched}) => {
        return (
          <Form className="log">
            <h1> Восстановление пароля</h1>
            <p className="log_text">Укажите ваш E-mail, и мы вышлем вам код подтверждения </p>
            <Field
              name="email"
              component={Email}
              error={touched.email ? errors.email : undefined}
            />
            <Button type="submit" text="Восстановить" className="contact_feedback_button"/>
          </Form>
        );
      }}
    </Formik>
  </div>
};
export default ForgotPassword;