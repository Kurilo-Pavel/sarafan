import Registration from "@/src/app/[locale]/registration/Registration";
import {useTranslations} from "next-intl";

const RegistrationPage = () => {
  const translate = useTranslations("Registration");
  const input = useTranslations("Input");
  const errors = useTranslations("Errors");
  const data = {
    errorEmail: errors("email"),
    errorPassword: errors("password"),
    errorPasswords: errors("passwords"),
    errorRules: errors("rules"),
    title: translate("title"),
    email: input("email"),
    password: input("password"),
    repeatPassword: input("repeatPassword"),
    inform: translate("inform"),
    button: translate("button")
  };
  return <Registration data={data}/>
};
export default RegistrationPage;