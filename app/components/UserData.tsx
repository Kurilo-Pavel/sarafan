import "@/app/styles/personalData.css";
import {Field, Form, Formik} from "formik";
import {emailCheck, loginCheck, passwordCheck} from "@/app/script";
import TextInput from "@/app/components/TextInput";
import Email from "@/app/components/Email";
import Button from "@/app/components/Button";
import Password from "@/app/components/Password";
import Checkbox from "@/app/components/Checkbox";
import {useAppDispatch, useAppSelector} from "@/app/store/hooks";
import {changedPassword, saveUsersData} from "@/app/store/user/userSlice";
import {Fragment, useEffect} from "react";

interface FormValuesUser {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  admin: boolean;
}

interface FormValuesPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

interface FormErrorsUser {
  [key: string]: string;
}

interface FormErrorsPassword {
  [key: string]: string;
}

const UserData = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.user);

  let initialValuesUser: FormValuesUser = {
    id: userData.id,
    lastName: userData.lastName || "",
    firstName: userData.firstName || "",
    phone: userData.phone || "",
    email: userData.email || "",
    admin: false,
  };

  const initialValuesPassword: FormValuesPassword = {
    email: userData.email,
    oldPassword: "",
    newPassword: ""
  };

  return <div className="personal_information">
    {userData.id && <Fragment>
      <Formik
        initialValues={initialValuesUser}
        validate={async (values: FormValuesUser) => {
          const errors: FormErrorsUser = {};
          if (!loginCheck(values.lastName)) {
            errors.lastName = "Некорректно указана фамилия";
          }
          if (!loginCheck(values.firstName)) {
            errors.firstName = "Некорректно указано имя";
          }
          if (!values.phone) {
            errors.phone = "Номер телефона не указан";
          }
          if (!emailCheck(values.email)) {
            errors.email = "Некорректно указан Email";
          }
          if (values.firstName === userData.firstName &&
            values.lastName === userData.lastName &&
            values.phone === userData.phone &&
            values.email === userData.email) {
            console.log("not changed")
          }

          return errors;
        }}
        onSubmit={(values: FormValuesUser) => {
          dispatch(saveUsersData(values));
        }}>
        {({errors, touched}) => {
          return (
            <Form className="dataUser">
              <h3 className="subTitle">Данные аккаунта</h3>
              <Field
                name="lastName"
                component={TextInput}
                className="log_input"
                placeholder={"Фамилия"}
                id="lastName"
                error={touched.lastName ? errors.lastName : undefined}
              />
              <Field
                name="firstName"
                component={TextInput}
                className="log_input"
                placeholder={"Имя"}
                id="firstName"
                error={touched.firstName ? errors.firstName : undefined}
              />
              <Field
                name="phone"
                component={TextInput}
                className="log_input"
                placeholder={"Телефон"}
                id="phone"
                error={touched.phone ? errors.phone : undefined}
              />
              <Field
                name="email"
                component={Email}
                placeholder={"Email"}
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
          if (!values.oldPassword) {
            errors.oldPassword = "field old password is empty";
          }
          if (!passwordCheck(values.newPassword)) {
            errors.newPassword = "incorrect password";
          }
          return errors;
        }}
        onSubmit={(values: FormValuesPassword) => {
          dispatch(changedPassword(values));
        }}>
        {({errors, touched}) => {
          return (
            <Form className="dataUser">
              <h3 className="subTitle">Смена пароля</h3>
              <Field
                component={Password}
                name="oldPassword"
                placeholder="Текущий пароль"
                error={touched.oldPassword ? errors.oldPassword : undefined}
              />
              <Field
                component={Password}
                name="newPassword"
                placeholder="Новый пароль"
                error={touched.newPassword ? errors.newPassword : undefined}
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
    </Fragment>}
  </div>
};
export default UserData;