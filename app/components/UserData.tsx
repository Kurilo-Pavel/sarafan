import "@/app/styles/personalData.css";
import {Field, Form, Formik} from "formik";
import {emailCheck, loginCheck, passwordCheck} from "@/app/script";
import TextInput from "@/app/components/TextInput";
import Email from "@/app/components/Email";
import Button from "@/app/components/Button";
import Password from "@/app/components/Password";
import Checkbox from "@/app/components/Checkbox";

interface FormValuesUser {
  last_name: string;
  first_name: string;
  phone: string;
  email: string;
}

interface FormValuesPassword {
  old_password: string;
  new_password: string;
}

interface FormErrorsUser {
  [key: string]: string;
}

interface FormErrorsPassword {
  [key: string]: string;
}

const UserData = () => {
  const initialValuesUser: FormValuesUser = {
    last_name: "",
    first_name: "",
    phone: "",
    email: ""
  };
  const initialValuesPassword: FormValuesPassword = {
    old_password: "",
    new_password: ""
  };
  return <div className="personal_information">
    <Formik
      initialValues={initialValuesUser}
      validate={async (values: FormValuesUser) => {
        const errors: FormErrorsUser = {};
        if (!loginCheck(values.last_name)) {
          errors.last_name = "incorrect last name";
        }
        if (!loginCheck(values.first_name)) {
          errors.first_name = "incorrect first name";
        }
        if (!values.phone) {
          errors.phone = "field phone is empty";
        }
        if (!emailCheck(values.email)) {
          errors.email = "incorrect email";
        }
        return errors;
      }}
      onSubmit={(values: FormValuesUser) => {
        console.log(values);
      }}>
      {({errors, touched}) => {
        return (
          <Form className="dataUser">
            <h3 className="subTitle">Данные аккаунта</h3>
            <Field
              name="last_name"
              component={TextInput}
              className="log_input"
              placeholder="Фамилия"
              id="last_name"
              error={touched.last_name ? errors.last_name : undefined}
            />
            <Field
              name="first_name"
              component={TextInput}
              className="log_input"
              placeholder="Имя"
              id="first_name"
              error={touched.first_name ? errors.first_name : undefined}
            />
            <Field
              name="phone"
              component={TextInput}
              className="log_input"
              placeholder="Телефон"
              id="phone"
              error={touched.phone ? errors.phone : undefined}
            />
            <Field
              name="email"
              component={Email}
              placeholder="Email"
              className="log_input"
              error={touched.email ? errors.email : undefined}
            />
            <Button type="submit" text="Сохранить" className="button_white"/>
          </Form>);
      }}
    </Formik>
    <Formik
      initialValues={initialValuesPassword}
      validate={async (values: FormValuesPassword) => {
        const errors: FormErrorsPassword = {};
        if (!values.old_password) {
          errors.old_password = "field old password is empty";
        }
        if (!passwordCheck(values.new_password)) {
          errors.new_password = "incorrect password";
        }
        return errors;
      }}
      onSubmit={(values: FormValuesPassword) => {
        console.log(values);
      }}>
      {({errors, touched}) => {
        return (
          <Form className="dataUser">
            <h3 className="subTitle">Смена пароля</h3>
            <Field
              component={Password}
              name="old_password"
              placeholder="Текущий пароль"
              error={touched.old_password ? errors.old_password : undefined}
            />
            <Field
              component={Password}
              name="new_password"
              placeholder="Новый пароль"
              error={touched.new_password ? errors.new_password : undefined}
            />
            <Button className="button_white" type="submit" text="Изменить пароль"/>
          </Form>);
      }}
    </Formik>
    <div className="dataUser">
      <h3 className="subTitle">Уведомления</h3>
      <div className="notifications_checkbox">
        <Checkbox text="Я хочу получать рассылку электронных новостей шоурума"/>
      </div>
    </div>
  </div>
};
export default UserData;