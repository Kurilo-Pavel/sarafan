import "@/src/app/[locale]/styles/personalData.css";
import {Field, Form, Formik} from "formik";
import {emailCheck, loginCheck, passwordCheck} from "@/src/app/[locale]/script.mjs";
import TextInput from "@/src/app/[locale]/components/TextInput";
import Email from "@/src/app/[locale]/components/Email";
import Button from "@/src/app/[locale]/components/Button";
import Password from "@/src/app/[locale]/components/Password";
import Checkbox from "@/src/app/[locale]/components/Checkbox";
import {useAppDispatch, useAppSelector} from "@/src/app/[locale]/store/hooks";
import {changedPassword, saveUsersData} from "@/src/app/[locale]/store/user/userSlice";
import {useTranslations} from "next-intl";

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
  const translate = useTranslations("UserData");
  const errorsTr = useTranslations("Errors");
  const inputTr = useTranslations("Input");

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
    <Formik
      initialValues={initialValuesUser}
      validate={async (values: FormValuesUser) => {
        const errors: FormErrorsUser = {};
        if (!loginCheck(values.lastName)) {
          errors.lastName = errorsTr("lastName");
        }
        if (!loginCheck(values.firstName)) {
          errors.firstName = errorsTr("firstName");
        }
        if (!values.phone) {
          errors.phone = errorsTr("phone");
        }
        if (!emailCheck(values.email)) {
          errors.email = errorsTr("email");
        }
        if (values.firstName === userData.firstName &&
          values.lastName === userData.lastName &&
          values.phone === userData.phone &&
          values.email === userData.email) {
        }

        return errors;
      }}
      onSubmit={(values: FormValuesUser) => {
        dispatch(saveUsersData(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="dataUser">
            <h3 className="subTitle">{translate("title")}</h3>
            <Field
              name="lastName"
              component={TextInput}
              className="log_input"
              placeholder={inputTr("lastName")}
              id="lastName"
              error={touched.lastName ? errors.lastName : undefined}
            />
            <Field
              name="firstName"
              component={TextInput}
              className="log_input"
              placeholder={inputTr("firstName")}
              id="firstName"
              error={touched.firstName ? errors.firstName : undefined}
            />
            <Field
              name="phone"
              component={TextInput}
              className="log_input"
              placeholder={inputTr("phone")}
              id="phone"
              error={touched.phone ? errors.phone : undefined}
            />
            <Field
              name="email"
              component={Email}
              placeholder={inputTr("email")}
              className="log_input"
              error={touched.email ? errors.email : undefined}
            />
            <Button type="submit" text={translate("button")} className="button_white"/>
          </Form>);
      }}
    </Formik>
    <Formik
      initialValues={initialValuesPassword}
      validate={async (values: FormValuesPassword) => {
        const errors: FormErrorsPassword = {};
        if (!values.oldPassword) {
          errors.oldPassword = errorsTr("oldPassword");
        }
        if (!passwordCheck(values.newPassword)) {
          errors.newPassword = errorsTr("password");
        }
        return errors;
      }}
      onSubmit={(values: FormValuesPassword) => {
        dispatch(changedPassword(values));
      }}>
      {({errors, touched}) => {
        return (
          <Form className="dataUser">
            <h3 className="subTitle">{translate('passwordTitle')}</h3>
            <Field
              component={Password}
              name="oldPassword"
              placeholder={inputTr("currentPassword")}
              error={touched.oldPassword ? errors.oldPassword : undefined}
            />
            <Field
              component={Password}
              name="newPassword"
              placeholder={inputTr("newPassword")}
              error={touched.newPassword ? errors.newPassword : undefined}
            />
            <Button className="button_white" type="submit" text={translate("choosePassword")}/>
          </Form>);
      }}
    </Formik>
    <div className="dataUser">
      <h3 className="subTitle">{translate("notifications")}</h3>
      <div className="notifications_checkbox">
        <Checkbox text={translate("inform")}/>
      </div>
    </div>
  </div>
};
export default UserData;