import Login from "@/src/app/[locale]/log/Login";
import {useTranslations} from "next-intl";

const LoginPage = () => {
  const translate = useTranslations("Login");
  const registration = useTranslations("Registration")
  const errors = useTranslations("Error");
  const input = useTranslations("Input");
  const data = {
    errorEmail: errors("email"),
    errorPassword: errors("password"),
    title: translate("title"),
    email: input("email"),
    password: input("password"),
    button: translate("button"),
    registration: registration("title"),
    forgotPassword: translate("forgotPassword")
  };
  return <Login data={data}/>
};
export default LoginPage;